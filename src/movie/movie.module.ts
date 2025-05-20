import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieEntity } from 'src/movie/entities/movie.entity'
import { ActorEntity } from 'src/actor/entities/actor.entities'

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService], // MovieService будет доступен всем др модулям в том же экземпляре, они его черех imports должны покдлючить
})
export class MovieModule {}
