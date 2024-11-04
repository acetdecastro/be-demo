import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AxiesService } from './axies.service';
import { Axie } from './entities/axie.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth-guard';
import { AxieListResponse } from './dto/axie-list-response.dto';
import { AxieClass } from './enums/axie-class.enum';
import { AxieFetchSaveResponse } from './dto/axie-fetch-save-response.dto';

@Resolver(() => Axie)
export class AxiesResolver {
  constructor(private readonly axiesService: AxiesService) {}

  @Query(() => AxieListResponse, { name: 'getAllAxies' })
  @UseGuards(GqlAuthGuard)
  getAllAxies() {
    return this.axiesService.getAllAxies();
  }

  @Query(() => AxieListResponse, { name: 'getAxiesByClass' })
  @UseGuards(GqlAuthGuard)
  getAxiesByClass(
    @Args('class', { type: () => AxieClass, nullable: true })
    axieClass?: AxieClass,
  ) {
    return this.axiesService.getAxiesByClass(axieClass);
  }

  @Mutation(() => AxieFetchSaveResponse)
  @UseGuards(GqlAuthGuard)
  fetchAndSaveAxies() {
    return this.axiesService.fetchAndSaveAxies();
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  clearClassCollections() {
    return this.axiesService.clearCollections();
  }
}
