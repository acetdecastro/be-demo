import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { Axie } from '../entities/axie.entity';

@Injectable()
export class AxiesRepository extends AbstractRepository<Axie> {
  protected readonly logger = new Logger(AxiesRepository.name);

  constructor(@InjectModel(Axie.name) axieModel: Model<Axie>) {
    super(axieModel);
  }
}
