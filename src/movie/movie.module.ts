import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService], // MovieService будет доступен всем др модулям в том же экземпляре, они его черех imports должны покдлючить
})
export class MovieModule {}
