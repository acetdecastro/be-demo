import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { AquaticClass } from '../entities/aquatic-class.entity';

@Injectable()
export class AquaticClassRepository extends AbstractRepository<AquaticClass> {
  protected readonly logger = new Logger(AquaticClassRepository.name);

  constructor(
    @InjectModel(AquaticClass.name) aquaticClassModel: Model<AquaticClass>,
  ) {
    super(aquaticClassModel);
  }
}
