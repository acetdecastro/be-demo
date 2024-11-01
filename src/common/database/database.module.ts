import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
        dbName: configService.getOrThrow('DB_NAME'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  // registers the schemas to be available in repositories
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
