import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Axie } from './axie.entity';

@Schema({ collection: 'bug_class', timestamps: true })
@ObjectType()
export class BugClass extends Axie {}

export const BugClassSchema = SchemaFactory.createForClass(BugClass);
