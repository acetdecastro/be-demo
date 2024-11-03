import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { BugClass } from '../entities/bug-class.entity';

@Injectable()
export class BugClassRepository extends AbstractRepository<BugClass> {
  protected readonly logger = new Logger(BugClassRepository.name);

  constructor(@InjectModel(BugClass.name) bugClassModel: Model<BugClass>) {
    super(bugClassModel);
  }
}
