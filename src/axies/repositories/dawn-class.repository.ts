import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { DawnClass } from '../entities/dawn-class.entity';

@Injectable()
export class DawnClassRepository extends AbstractRepository<DawnClass> {
  protected readonly logger = new Logger(DawnClassRepository.name);

  constructor(@InjectModel(DawnClass.name) dawnClassModel: Model<DawnClass>) {
    super(dawnClassModel);
  }
}
