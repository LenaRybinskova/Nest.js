import { Injectable } from '@nestjs/common'

@Injectable()
export class MovieService {
  /*  // в конструкторе создается переменная доступная тольков этом класссе movieRepository
  // и в нее кладем Repository<MovieEntity> - это инструмент чтобы обращаться к сущности( таблице) MovieEntity
  // объект Repository предост методы для работы с таблицей: ind, save, delete

  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly posterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: { isAvailable: false }, //условие
      order: {
        //упорядочить по столбцу
        createdAt: 'desc',
      },
      take: 3, //по сколько возвращать( для панинации)
      select: {
        //какие поля возвращать
        id: true,
        title: true,
        releaseYear: true,
      },
    })
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id: id },
      relations: ['actors'],
    })
    if (!movie) {
      throw new NotFoundException('Фильм не найден')
    }
    return movie
  }

  //создаем актера, предаем с фронта:title, releaseYear, actorsIds
  async create(dto: MovieDTO): Promise<MovieEntity> {
    const { releaseYear, title, actorsIds, posterUrl } = dto

    //нашли конкр актеров в Сущности Актеров
    const actors = await this.actorRepository.find({
      where: {
        id: In(actorsIds),
      },
    })

    //если в запросе передали постерУРЛ, то создаепм запись в сущность Постер
    let poster: MoviePosterEntity | null = null //по федолту будет
    if (posterUrl) {
      poster = this.posterRepository.create({ url: posterUrl })
      await this.posterRepository.save(poster)
    }
    if (!actors || !actors.length)
      throw new NotFoundException('Один или несколько актеров не найдены')

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    })
    return await this.movieRepository.save(movie)
  }

  async updateMovie(id: string, dto: MovieDTO): Promise<boolean> {
    const movie = await this.findById(id)
    Object.assign(movie, dto)
    await this.movieRepository.save(movie)
    return true
  }

  async deleteMovie(id: string): Promise<string> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return movie.id;
  }
  */
}
