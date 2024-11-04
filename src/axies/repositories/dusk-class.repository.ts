import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { DuskClass } from '../entities/dusk-class.entity';

@Injectable()
export class DuskClassRepository extends AbstractRepository<DuskClass> {
  protected readonly logger = new Logger(DuskClassRepository.name);

  constructor(@InjectModel(DuskClass.name) duskClassModel: Model<DuskClass>) {
    super(duskClassModel);
  }
}
