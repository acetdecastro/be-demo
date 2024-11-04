import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

type OmittedFieldsWhenCreating = '_id' | 'createdAt' | 'updatedAt';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, OmittedFieldsWhenCreating>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>(); // lean returns unhydrated JS object of the Document

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true, // return updated document
      })
      .lean<T>();

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndDelete(filterQuery).lean<T>();
  }

  // for DEV purposes only
  // delete all documents in a given collection
  async deleteAll(): Promise<number> {
    const result = await this.model.deleteMany({});
    return result.deletedCount;
  }
}
