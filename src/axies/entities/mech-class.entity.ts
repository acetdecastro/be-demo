import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ collection: 'mech_class', timestamps: true })
@ObjectType()
export class MechClass extends Axie {}

export const MechClassSchema = SchemaFactory.createForClass(MechClass);
