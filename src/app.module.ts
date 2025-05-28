import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ReviewModule } from 'src/review/review.module'
import { ActorModule } from 'src/actor/actor.module'
import { MovieModule } from 'src/movie/movie.module'
import { PrismaModule } from './prisma/prisma.module'
import { LoggingMiddleware } from 'src/common/middlewares/logger.moddleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    MovieModule,
    ReviewModule,
    ActorModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '/movies', method: RequestMethod.POST }) // // конкр машр и тип запроса
    // consumer.apply(LoggingMiddleware).forRoutes(AppController) // можно указать конкр контроллер
    // consumer.apply(LoggingMiddleware).forRoutes("*")// можно указать ВСЕ маршруты
    // consumer.apply(LoggingMiddleware).exclude() // для каких маршр он не будет сраб
  }
}
