import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { MovieDTO } from 'src/movie/dto/movie.dto'
import { Movie, MoviePoster } from '@prisma/client'

@Injectable()
export class MovieService {
  // TYPE ORM
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
  private readonly logger = new Logger(MovieService.name)

  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.movie.findMany({
      where: { isAvailable: false },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        actor: {
          select: {
            id: true,
            name: true,
          },
        },
        review: true,
      },
    })
  }

  async create(dto: MovieDTO): Promise<Movie> {
    const { actorsIds, releaseYear, title, posterUrl } = dto
    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: actorsIds } },
    })

    if (!actors || !actors.length) {
      throw new NotFoundException(`Один или несколько актеров не найдено`)
    }

    const movie = this.prismaService.movie.create({
      data: {
        releaseYear,
        title,
        poster: posterUrl
          ? { create: { url: posterUrl, name: 'default name' } }
          : undefined,
        actor: { connect: actors.map((actor) => ({ id: actor.id })) }, //connect подвяжет актеров к фильму
      },
      include: {
        actor: true, //include добавить актеров в ретурн
      },
    })

    return movie
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: { actor: true, poster: true, review: true },
    })

    if (!movie) {
      throw new NotFoundException('Фильм не найден')
    }

    return movie
  }

  async updateMovie(id: string, dto: MovieDTO): Promise<boolean> {
    const movie = await this.findById(id)

    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: dto.actorsIds } },
    })

    if (!actors || !actors.length) {
      throw new NotFoundException(`Один или несколько актеров не найдено`)
    }

    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.posterUrl
          ? { create: { url: dto.posterUrl, name: 'default name' } }
          : undefined,
        actor: { connect: actors.map((actor) => ({ id: actor.id })) },
      },
    })
    return true
  }

  async deleteMovie(id: string) {
    const movie = await this.findById(id)
    await this.prismaService.movie.delete({ where: { id } })
    return movie.id
  }
}
