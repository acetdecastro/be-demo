import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ versionKey: false, collection: 'aquatic_class', timestamps: true })
@ObjectType()
export class AquaticClass extends Axie {}

export const AquaticClassSchema = SchemaFactory.createForClass(AquaticClass);
