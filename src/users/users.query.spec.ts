import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersQuery } from './users.query';

describe('UsersQuery', () => {
  let resolver: UsersQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersQuery, UsersService],
    }).compile();

    resolver = module.get<UsersQuery>(UsersQuery);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
