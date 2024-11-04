import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ versionKey: false, collection: 'dusk_class', timestamps: true })
@ObjectType()
export class DuskClass extends Axie {}

export const DuskClassSchema = SchemaFactory.createForClass(DuskClass);
