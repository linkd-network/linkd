import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config();

const API_PORT = process.env.API_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('mgmt/v1');
  await app.listen(Number(API_PORT));
  
}
bootstrap();
