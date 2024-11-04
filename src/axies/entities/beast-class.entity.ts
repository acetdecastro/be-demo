import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ versionKey: false, collection: 'beast_class', timestamps: true })
@ObjectType()
export class BeastClass extends Axie {}

export const BeastClassSchema = SchemaFactory.createForClass(BeastClass);
