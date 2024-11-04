import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private readonly logger: Logger = new Logger(BlockchainService.name);
  private provider: ethers.Provider;
  private contract: ethers.Contract;

  private contractAddress = '0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d';
  private abi = ['function marketplaceManager() view returns (address)'];

  constructor(private configService: ConfigService) {
    const INFURA_API_KEY: string =
      this.configService.getOrThrow('INFURA_API_KEY');
    const infuraUrl = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
    this.provider = new ethers.JsonRpcProvider(infuraUrl);
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.abi,
      this.provider,
    );
  }

  async getMarketplaceManager(): Promise<string> {
    try {
      return await this.contract.marketplaceManager();
    } catch (error) {
      this.logger.error(`Error fetching marketplaceManager`, error);
      throw new InternalServerErrorException(
        'Failed to fetch marketplace manager',
      );
    }
  }
}
