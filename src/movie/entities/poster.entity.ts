import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { MovieEntity } from 'src/movie/entities/movie.entity'

@Entity({ name: 'movie_poster' })
export class MoviePosterEntity {
  @PrimaryGeneratedColumn('uuid') //генерирует автом ИД
  id: string

  //картинка постера
  @Column({ type: 'varchar', length: 255 })
  url: string

  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  movie: MovieEntity

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
