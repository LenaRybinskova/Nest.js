import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // добавл для валидации всех запр

  await app.listen(3000);
}

bootstrap();

//await app.listen(process.env.PORT ?? 3000);
