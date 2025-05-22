import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

import { ReviewModule } from 'src/review/review.module'
import { ActorModule } from 'src/actor/actor.module'
import { MovieModule } from 'src/movie/movie.module'
import { PrismaModule } from './prisma/prisma.module'

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
export class AppModule {}
