import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { logger } from 'src/common/middlewares/logger.moddleware'
import { AllExeptionsFilter } from 'src/common/filters/all-exeptions.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe()) // добавл для валидации всех запр
  app.useGlobalFilters(new AllExeptionsFilter)
  app.use(logger) //подкл функ логирования мидлвер
  //app.setGlobalPrefix('api');
  //app.useGlobalGuards(new AuthGuard) //подкл AuthGuard глобально
  //app.useGlobalInterceptors(new ResponseInterseptor()) //подкл интерсепторов глобально

  const config = new DocumentBuilder()
    .setTitle('Nest js course')
    .setDescription('Api documentation')
    .setVersion('1.0.0')
    .setContact('Lena Rybinskova', 'http://kllfdk', 'support@mail.com')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/swagger', app, document)

  await app.listen(3000)
}

bootstrap()

//await app.listen(process.env.PORT ?? 3000);
