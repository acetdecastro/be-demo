import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { PlantClass } from '../entities/plant-class.entity';

@Injectable()
export class PlantClassRepository extends AbstractRepository<PlantClass> {
  protected readonly logger = new Logger(PlantClassRepository.name);

  constructor(
    @InjectModel(PlantClass.name) plantClassModel: Model<PlantClass>,
  ) {
    super(plantClassModel);
  }
}
