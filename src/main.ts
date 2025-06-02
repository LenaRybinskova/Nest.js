import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { logger } from 'src/common/middlewares/logger.moddleware'
import { AllExeptionsFilter } from 'src/common/filters/all-exeptions.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MovieModule } from 'src/movie/movie.module'
import { MovieResponseDto } from 'src/movie/dto/create-movie.request'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe()) // добавл для валидации всех запр
  app.useGlobalFilters(new AllExeptionsFilter())
  app.use(logger) //подкл функ логирования мидлвер
  //app.setGlobalPrefix('api');
  //app.useGlobalGuards(new AuthGuard) //подкл AuthGuard глобально
  //app.useGlobalInterceptors(new ResponseInterseptor()) //подкл интерсепторов глобально

  const config = new DocumentBuilder()
    .setTitle('Nest js course')
    .setDescription('Api documentation')
    .setVersion('1.0.0')
    .setContact('Lena Rybinskova', 'http://kllfdk', 'support@mail.com')
    .addBearerAuth()
    .setTermsOfService('http:l;k;l')
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule], // include - можно указать какие конкр модули должный в сваггер попадать
    deepScanRoutes: true, // будет анализир более глубокие маршр
    extraModels: [MovieResponseDto], // если тип MovieResponseDto нигде не исп, но надо чтобы в schemas swagger попал
    operationIdFactory: (controllerKey, methodKey) =>
      `${controllerKey}-${methodKey}`,
  })

  //{jsonDocumentUrl:"",yamlDocumentUrl:""} опис если на фронте типы генерируются за счет документации
  SwaggerModule.setup('/swagger', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
  })

  await app.listen(3000)
}

bootstrap()

//await app.listen(process.env.PORT ?? 3000);
