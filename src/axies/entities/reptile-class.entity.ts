import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ versionKey: false, collection: 'reptile_class', timestamps: true })
@ObjectType()
export class ReptileClass extends Axie {}

export const ReptileClassSchema = SchemaFactory.createForClass(ReptileClass);
