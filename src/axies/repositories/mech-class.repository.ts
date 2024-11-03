import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { MechClass } from '../entities/mech-class.entity';

@Injectable()
export class MechClassRepository extends AbstractRepository<MechClass> {
  protected readonly logger = new Logger(MechClassRepository.name);

  constructor(@InjectModel(MechClass.name) mechClassModel: Model<MechClass>) {
    super(mechClassModel);
  }
}
