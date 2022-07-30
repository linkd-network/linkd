import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/config.service';
import { AdsModule } from './modules/ads/ads.module';
import { DrtModule } from './modules/drt/drt.module';
import { TrackApiModule } from './modules/track-api/track-api.module';

require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB;

@Module({
  imports: [
    TrackApiModule,
    AdsModule,
    DrtModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB,
      entities: [__dirname + '/../**/*.entity.js'],
      ssl: false,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
