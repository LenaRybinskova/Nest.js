import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDTO } from 'src/movie/dto/movie.dto';

@Injectable()
export class MovieService {
  // в конструкторе создается переменная доступная тольков этом класссе movieRepository
  // и в нее кладем Repository<MovieEntity> - это инструмент чтобы обращаться к сущности( таблице) MovieEntity
  // объект Repository предост методы для работы с таблицей: ind, save, delete

  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: { isPublic: false }, //условие
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
    });
  }

  async findById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id: id },
    });
    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }
    return movie;
  }

  async create(dto: MovieDTO): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto); //создали в БД
    return await this.movieRepository.save(movie);
  }

  async updateMovie(id: number, dto: MovieDTO): Promise<boolean> {
    const movie = await this.findById(id);
    Object.assign(movie, dto);
    await this.movieRepository.save(movie);
    return true;
  }

  async deleteMovie(id: number): Promise<number> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return movie.id;
  }
}
