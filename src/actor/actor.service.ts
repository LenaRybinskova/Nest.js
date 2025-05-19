import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ActorEntity } from 'src/actor/entities/actor.entities'
import { Repository } from 'typeorm'
import { CreateActorDto } from 'src/actor/dto/create-actor.dto'

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    public readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async createActor(dto: CreateActorDto): Promise<ActorEntity> {
    const { name } = dto
    const actor = this.actorRepository.create({ name })
    return await this.actorRepository.save(actor)
  }
}
