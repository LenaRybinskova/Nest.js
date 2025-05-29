import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { logger } from 'src/common/middlewares/logger.moddleware'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { ResponseInterseptor } from 'src/common/interseptors/response.interseptor'
import { AllExeptionsFilter } from 'src/common/filters/all-exeptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe()) // добавл для валидации всех запр
  //app.setGlobalPrefix('api');

  app.use(logger) //подкл функ логирования мидлвер
  //app.useGlobalGuards(new AuthGuard) //подкл AuthGuard глобально
  //app.useGlobalInterceptors(new ResponseInterseptor())
  app.useGlobalFilters(new AllExeptionsFilter)

  await app.listen(3000)
}

bootstrap()

//await app.listen(process.env.PORT ?? 3000);
