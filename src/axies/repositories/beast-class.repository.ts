import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { BeastClass } from '../entities/beast-class.entity';

@Injectable()
export class BeastClassRepository extends AbstractRepository<BeastClass> {
  protected readonly logger = new Logger(BeastClassRepository.name);

  constructor(
    @InjectModel(BeastClass.name) beastClassModel: Model<BeastClass>,
  ) {
    super(beastClassModel);
  }
}
