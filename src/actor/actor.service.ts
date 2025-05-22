import { Injectable } from '@nestjs/common'

@Injectable()
export class ActorService {
  /*  constructor(
    @InjectRepository(ActorEntity)
    public readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async createActor(dto: CreateActorDto): Promise<ActorEntity> {
    const { name } = dto
    const actor = this.actorRepository.create({ name })
    return await this.actorRepository.save(actor)
  }*/
}
