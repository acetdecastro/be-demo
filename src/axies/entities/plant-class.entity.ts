import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ versionKey: false, collection: 'plant_class', timestamps: true })
@ObjectType()
export class PlantClass extends Axie {}

export const PlantClassSchema = SchemaFactory.createForClass(PlantClass);
