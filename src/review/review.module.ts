import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieService } from 'src/movie/movie.service'
import { ReviewEntity } from 'src/review/entity/review.entity'
import { MovieEntity } from 'src/movie/entities/movie.entity'
import { ActorEntity } from 'src/actor/entities/actor.entities'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, MovieEntity, ActorEntity])],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}
