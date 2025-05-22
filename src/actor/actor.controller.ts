import { Controller } from '@nestjs/common'
import { ActorService } from './actor.service'

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  /*@Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.createActor(dto)
  }*/
}
