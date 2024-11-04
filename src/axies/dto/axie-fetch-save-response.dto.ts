import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BulkWriteResult } from 'mongodb';

@ObjectType()
export class AxieFetchSaveResponse
  implements Pick<BulkWriteResult, 'upsertedCount'>
{
  @Field(() => Int)
  upsertedCount: number;
}
