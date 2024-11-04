import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainResolver } from './blockchain.resolver';
import { BlockchainService } from './blockchain.service';

describe('BlockchainResolver', () => {
  let resolver: BlockchainResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockchainResolver, BlockchainService],
    }).compile();

    resolver = module.get<BlockchainResolver>(BlockchainResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
