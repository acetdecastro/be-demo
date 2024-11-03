import { Test, TestingModule } from '@nestjs/testing';
import { AxiesResolver } from './axies.resolver';
import { AxiesService } from './axies.service';

describe('AxiesResolver', () => {
  let resolver: AxiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiesResolver, AxiesService],
    }).compile();

    resolver = module.get<AxiesResolver>(AxiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
