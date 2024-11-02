import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersMutation } from './users.mutation';

describe('UsersMutation', () => {
  let resolver: UsersMutation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMutation, UsersService],
    }).compile();

    resolver = module.get<UsersMutation>(UsersMutation);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
