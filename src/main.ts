import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { logger } from 'src/common/middlewares/logger.moddleware'
import { AuthGuard } from 'src/common/guards/auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe()) // добавл для валидации всех запр
  //app.setGlobalPrefix('api');

  app.use(logger) //подкл функ логирования мидлвер
  //app.useGlobalGuards(new AuthGuard) //подкл AuthGuard глобально

  await app.listen(3000)
}

bootstrap()

//await app.listen(process.env.PORT ?? 3000);
