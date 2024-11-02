import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersQuery } from './users.query';
import { UsersMutation } from './users.mutation';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersQuery, UsersMutation, UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
