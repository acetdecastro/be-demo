import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ collection: 'bird_class', timestamps: true })
@ObjectType()
export class BirdClass extends Axie {}

export const BirdClassSchema = SchemaFactory.createForClass(BirdClass);
