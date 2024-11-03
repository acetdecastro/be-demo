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

interface RawAxieResponse {
  id: string;
  name: string;
  stage: number;
  class: AxieClass;
}

@Injectable()
export class AxiesService {
  private readonly logger: Logger;
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
  ) {
    this.logger = new Logger(AxiesService.name);
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
        return null;
    }
  }

  private async saveAxiesToMongoDB(axies: RawAxieResponse[]) {
    for (const axie of axies) {
      const repository = this.getRepositoryByClass(axie.class);

      try {
        await repository.create({
          axieId: axie.id,
          name: axie.name,
          stage: axie.stage,
          class: axie.class,
        });
      } catch (error) {
        // MongoError: E11000 duplicate key error collection
        if (error.message.includes('E11000')) {
          this.logger.warn(`Duplicate Axie ID: ${axie.id} - skipping.`);
          continue;
        }
        this.logger.error(`Error while saving Axies: ${error}`);
        throw new Error(error);
      }
    }
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

  async fetchAndSaveAxies(size: number = 300): Promise<string> {
    const axies = await this.fetchAxiesFromAPI(size);
    if (!axies) {
      return 'No axies fetched.';
    }
    await this.saveAxiesToMongoDB(axies);
    return 'Successful operation.';
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
