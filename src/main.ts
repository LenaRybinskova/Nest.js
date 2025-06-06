import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser';
import {setupSwagger} from 'src/utils/swagger-utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe())

  setupSwagger(app)

  await app.listen(3000)
}

bootstrap()

//await app.listen(process.env.PORT ?? 3000);
