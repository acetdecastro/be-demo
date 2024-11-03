import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { BirdClass } from '../entities/bird-class.entity';

@Injectable()
export class BirdClassRepository extends AbstractRepository<BirdClass> {
  protected readonly logger = new Logger(BirdClassRepository.name);

  constructor(@InjectModel(BirdClass.name) birdClassModel: Model<BirdClass>) {
    super(birdClassModel);
  }
}
