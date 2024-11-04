import { Resolver, Query } from '@nestjs/graphql';
import { BlockchainService } from './blockchain.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth-guard';

@Resolver()
export class BlockchainResolver {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Query(() => String, { name: 'getMarketplaceManager' })
  @UseGuards(GqlAuthGuard)
  async getMarketplaceManager(): Promise<string> {
    return await this.blockchainService.getMarketplaceManager();
  }
}
