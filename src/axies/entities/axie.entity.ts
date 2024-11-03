import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema({ versionKey: false, timestamps: true })
@ObjectType()
export class Axie extends AbstractEntity {
  @Prop({ required: true, unique: true })
  @Field(() => ID)
  axieId: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  name?: string;

  @Prop({ required: true })
  @Field(() => Number)
  stage: number;

  @Prop({ required: true })
  @Field(() => String)
  class: string;

  // See issue: https://github.com/acetdecastro/be-demo/issues/4
  // @Prop({ required: true })
  // @Field(() => Float)
  // currentPriceUSD: number;
}

export const AxieSchema = SchemaFactory.createForClass(Axie);
