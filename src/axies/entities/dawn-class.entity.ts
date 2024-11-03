import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ collection: 'dawn_class', timestamps: true })
@ObjectType()
export class DawnClass extends Axie {}

export const DawnClassSchema = SchemaFactory.createForClass(DawnClass);
