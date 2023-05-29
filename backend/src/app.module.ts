import { config } from 'dotenv';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './models/cats/cats.module';
import { CatsController } from './models/cats/cats.controller';
import { CatsService } from './models/cats/cats.service';
import { Cat, CatSchema } from './models/cats/cat.schema';

config({ path: join(__dirname, '..', '.env') });

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    CatsModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
