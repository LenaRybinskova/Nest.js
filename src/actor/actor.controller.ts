import { Body, Controller, Post } from '@nestjs/common'
import { ActorService } from './actor.service'
import { CreateActorDto } from 'src/actor/dto/create-actor.dto'

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  //typeORM и Prisma одно и тоже
  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.createActor(dto)
  }
}
