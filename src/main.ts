import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用全局管道验证
  app.useGlobalPipes(new ValidationPipe());
  // cookie
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
