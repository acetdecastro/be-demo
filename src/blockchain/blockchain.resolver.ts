import { Resolver, Query } from '@nestjs/graphql';
import { BlockchainService } from './blockchain.service';

@Resolver()
export class BlockchainResolver {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Query(() => String, { name: 'getMarketplaceManager' })
  async getMarketplaceManager(): Promise<string> {
    return await this.blockchainService.getMarketplaceManager();
  }
}
