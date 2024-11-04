import { Injectable, Logger } from '@nestjs/common';
import { BeastClassRepository } from './repositories/beast-class.repository';
import { PlantClassRepository } from './repositories/plant-class.repository';
import { AquaticClassRepository } from './repositories/aquatic-class.repository';
import { BirdClassRepository } from './repositories/bird-class.repository';
import { MechClassRepository } from './repositories/mech-class.repository';
import { DawnClassRepository } from './repositories/dawn-class.repository';
import { DuskClassRepository } from './repositories/dusk-class.repository';
import { BugClassRepository } from './repositories/bug-class.entity';
import { ReptileClassRepository } from './repositories/reptile-class.entity';
import { Axie } from './entities/axie.entity';
import { AxieListResponse } from './dto/axie-list-response.dto';
import { AxieClass } from './enums/axie-class.enum';
import { AxieFetchSaveResponse } from './dto/axie-fetch-save-response.dto';
import { AxiesRepository } from './repositories/axies.repository';

// represents the raw axie data fetched from the GraphQL API
interface RawAxieResponse extends Pick<Axie, 'name' | 'stage' | 'class'> {
  id: string;
}

// represents an axie document that is pending insertion into the database
interface AxieCreationData extends Pick<Axie, 'name' | 'stage' | 'class'> {
  axieId: string;
}

@Injectable()
export class AxiesService {
  private readonly logger: Logger = new Logger(AxiesService.name);
  private readonly repositories: (
    | BeastClassRepository
    | PlantClassRepository
    | BugClassRepository
    | AquaticClassRepository
    | BirdClassRepository
    | ReptileClassRepository
    | MechClassRepository
    | DawnClassRepository
    | DuskClassRepository
  )[];

  constructor(
    private readonly beastClassRepository: BeastClassRepository,
    private readonly plantClassRepository: PlantClassRepository,
    private readonly bugClassRepository: BugClassRepository,
    private readonly aquaticClassRepository: AquaticClassRepository,
    private readonly birdClassRepository: BirdClassRepository,
    private readonly reptileClassRepository: ReptileClassRepository,
    private readonly mechClassRepository: MechClassRepository,
    private readonly dawnClassRepository: DawnClassRepository,
    private readonly duskClassRepository: DuskClassRepository,
    private readonly axiesRepository: AxiesRepository,
  ) {
    this.repositories = [
      this.beastClassRepository,
      this.plantClassRepository,
      this.bugClassRepository,
      this.aquaticClassRepository,
      this.birdClassRepository,
      this.reptileClassRepository,
      this.mechClassRepository,
      this.dawnClassRepository,
      this.duskClassRepository,
    ];
  }

  private getRepositoryByClass(axieClass: AxieClass) {
    switch (axieClass) {
      case AxieClass.BEAST:
        return this.beastClassRepository;
      case AxieClass.PLANT:
        return this.plantClassRepository;
      case AxieClass.BUG:
        return this.bugClassRepository;
      case AxieClass.AQUATIC:
        return this.aquaticClassRepository;
      case AxieClass.BIRD:
        return this.birdClassRepository;
      case AxieClass.REPTILE:
        return this.reptileClassRepository;
      case AxieClass.MECH:
        return this.mechClassRepository;
      case AxieClass.DAWN:
        return this.dawnClassRepository;
      case AxieClass.DUSK:
        return this.duskClassRepository;
      default:
        return this.axiesRepository;
    }
  }

  private async saveAxiesToMongoDB(
    axies: RawAxieResponse[],
  ): Promise<AxieFetchSaveResponse> {
    const axieDataByClass: { [key in AxieClass]?: AxieCreationData[] } = {};

    // group axies by their class for processing with each repository
    for (const axie of axies) {
      // checks if axie's class from the external API exists in the current implementation,
      // set to empty [] if it doesn't exist
      if (!axieDataByClass[axie.class]) {
        axieDataByClass[axie.class] = [];
      }
      axieDataByClass[axie.class].push({
        axieId: axie.id,
        name: axie.name,
        stage: axie.stage,
        class: axie.class,
      });
    }

    let upsertedCount = 0;

    // upsert each class of axie using bulkWrite
    for (const axieClass of Object.keys(axieDataByClass) as AxieClass[]) {
      const repository = this.getRepositoryByClass(axieClass);
      const axieData = axieDataByClass[axieClass] || [];

      const bulkOperations = axieData.map((axie) => ({
        updateOne: {
          filter: { axieId: axie.axieId },
          update: { $set: axie },
          upsert: true, // duplicate axieIds will be skipped/ignored
        },
      }));

      try {
        const result = await repository.bulkWrite(bulkOperations);
        upsertedCount += result.upsertedCount; // track successful upserts
      } catch (error) {
        this.logger.error(
          `Error while saving Axies for class ${axieClass}: ${error}`,
        );
        throw new Error(error);
      }
    }

    return { upsertedCount };
  }

  private async fetchAxiesFromAPI(
    size: number = 300,
  ): Promise<RawAxieResponse[]> {
    const response = await fetch(
      'https://graphql-gateway.axieinfinity.com/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operationName: 'GetAxieBriefList',
          variables: {
            from: 0,
            size: size,
            sort: 'PriceAsc',
          },
          query: `
            query GetAxieBriefList(
              $from: Int,
              $size: Int,
              $sort: SortBy
            ) {
              axies(
                from: $from,
                size: $size,
                sort: $sort
              ) {
                total
                results {
                  id
                  name
                  stage
                  class
                }
              }
            }
          `,
        }),
      },
    );

    const data = await response.json();
    if (data.errors) {
      this.logger.error('GraphQL Error:', data.errors[0]);
      throw new Error(data.errors[0].message);
    }

    return data.data?.axies?.results ?? [];
  }

  async fetchAndSaveAxies(
    size: number = 300,
  ): Promise<string | AxieFetchSaveResponse> {
    const axies = await this.fetchAxiesFromAPI(size);
    if (!axies) {
      return {
        upsertedCount: 0,
      };
    }
    return await this.saveAxiesToMongoDB(axies);
  }

  async getAxiesByClass(axieClass?: AxieClass): Promise<AxieListResponse> {
    if (axieClass) {
      const repository = this.getRepositoryByClass(axieClass);
      const results = await repository.find({ class: axieClass });
      return { total: results.length, results };
    } else {
      return await this.getAllAxies();
    }
  }

  async getAllAxies(): Promise<AxieListResponse> {
    let results: Axie[] = [];

    for (const repository of this.repositories) {
      const classAxies = await repository.find({});
      results = results.concat(classAxies);
    }

    const total = results.length;
    return { total, results };
  }

  async clearCollections(): Promise<string> {
    let totalDeleted = 0;

    for (const repository of this.repositories) {
      const deletedCount = await repository.deleteAll();
      totalDeleted += deletedCount;
      this.logger.log(
        `Cleared ${deletedCount} documents from ${repository.constructor.name}.`,
      );
    }

    return `Successfully cleared ${totalDeleted} documents from all collections.`;
  }
}
