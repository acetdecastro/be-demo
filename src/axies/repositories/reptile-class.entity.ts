import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { ReptileClass } from '../entities/reptile-class.entity';

@Injectable()
export class ReptileClassRepository extends AbstractRepository<ReptileClass> {
  protected readonly logger = new Logger(ReptileClassRepository.name);

  constructor(
    @InjectModel(ReptileClass.name) reptileClassModel: Model<ReptileClass>,
  ) {
    super(reptileClassModel);
  }
}
