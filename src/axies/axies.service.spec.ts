import { Test, TestingModule } from '@nestjs/testing';
import { AxiesService } from './axies.service';

describe('AxiesService', () => {
  let service: AxiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiesService],
    }).compile();

    service = module.get<AxiesService>(AxiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
