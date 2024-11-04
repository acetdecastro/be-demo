import { Module } from '@nestjs/common';
import { AxiesService } from './axies.service';
import { AxiesResolver } from './axies.resolver';
import { DatabaseModule } from 'src/common/database/database.module';

import { BeastClass, BeastClassSchema } from './entities/beast-class.entity';
import { PlantClass, PlantClassSchema } from './entities/plant-class.entity';
import {
  AquaticClass,
  AquaticClassSchema,
} from './entities/aquatic-class.entity';
import { BirdClass, BirdClassSchema } from './entities/bird-class.entity';
import { BugClass, BugClassSchema } from './entities/bug-class.entity';
import {
  ReptileClass,
  ReptileClassSchema,
} from './entities/reptile-class.entity';
import { MechClass, MechClassSchema } from './entities/mech-class.entity';
import { DawnClass, DawnClassSchema } from './entities/dawn-class.entity';
import { DuskClass, DuskClassSchema } from './entities/dusk-class.entity';

import { BeastClassRepository } from './repositories/beast-class.repository';
import { PlantClassRepository } from './repositories/plant-class.repository';
import { AquaticClassRepository } from './repositories/aquatic-class.repository';
import { BirdClassRepository } from './repositories/bird-class.repository';
import { MechClassRepository } from './repositories/mech-class.repository';
import { DawnClassRepository } from './repositories/dawn-class.repository';
import { DuskClassRepository } from './repositories/dusk-class.repository';
import { BugClassRepository } from './repositories/bug-class.entity';
import { ReptileClassRepository } from './repositories/reptile-class.entity';
import { UsersRepository } from 'src/users/users.repository';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Axie, AxieSchema } from './entities/axie.entity';
import { AxiesRepository } from './repositories/axies.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: BeastClass.name, schema: BeastClassSchema },
      { name: PlantClass.name, schema: PlantClassSchema },
      { name: AquaticClass.name, schema: AquaticClassSchema },
      { name: BirdClass.name, schema: BirdClassSchema },
      { name: BugClass.name, schema: BugClassSchema },
      { name: ReptileClass.name, schema: ReptileClassSchema },
      { name: MechClass.name, schema: MechClassSchema },
      { name: DawnClass.name, schema: DawnClassSchema },
      { name: DuskClass.name, schema: DuskClassSchema },
      { name: Axie.name, schema: AxieSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    AxiesResolver,
    AxiesService,
    BeastClassRepository,
    PlantClassRepository,
    AquaticClassRepository,
    BirdClassRepository,
    BugClassRepository,
    ReptileClassRepository,
    MechClassRepository,
    DawnClassRepository,
    DuskClassRepository,
    AxiesRepository,
    UsersRepository,
  ],
})
export class AxiesModule {}
