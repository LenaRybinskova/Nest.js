import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateActorDto } from 'src/actor/dto/create-actor.dto'
import { Actor } from '@prisma/client'

@Injectable()
export class ActorService {
  //typeORM
  /*  constructor(
    @InjectRepository(ActorEntity)
    public readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async createActor(dto: CreateActorDto): Promise<ActorEntity> {
    const { name } = dto
    const actor = this.actorRepository.create({ name })
    return await this.actorRepository.save(actor)
  }*/

  constructor(public readonly prismaService: PrismaService) {}

  async createActor(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto
    const actor = await this.prismaService.actor.create({
      data: { name },
    })
    return actor
  }
}
