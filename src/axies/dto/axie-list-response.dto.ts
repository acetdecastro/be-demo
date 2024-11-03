import { ObjectType, Field } from '@nestjs/graphql';
import { Axie } from '../entities/axie.entity';

@ObjectType()
export class AxieListResponse {
  @Field()
  total: number;

  @Field(() => [Axie])
  results: Axie[];
}
