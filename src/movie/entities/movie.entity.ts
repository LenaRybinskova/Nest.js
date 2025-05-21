import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ReviewEntity } from 'src/review/entity/review.entity'
import { ActorEntity } from 'src/actor/entities/actor.entities'
import { MoviePosterEntity } from 'src/movie/entities/poster.entity'

export enum Genre {
  ACTION = 'action',
  HORROR = 'horror ',
  COMEDY = 'comedy',
  DRAMA = 'drama',
}

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid') //генерирует автом ИД
  id: string

  @Column({ type: 'varchar', length: 128 }) //varchar значит текст поле
  title: string

  @Column({ type: 'text', nullable: true }) //nullable значит может быть необязательным полем
  description: string

  @Column({ type: 'int', unsigned: true, name: 'release_year' }) //unsigned -только положительные могут быть числа , name назв столбца в Бикипер
  releaseYear: number

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0.0 }) //precision -3хзначное число, scale - колво цифр после запятой, default знач при создании дефолтное
  rating: number

  @Column({ default: false, name: 'is_available' })
  isAvailable: boolean

  @Column({ type: 'enum', enum: Genre, default: Genre.COMEDY })
  genre: Genre

  @Column({ type: 'date', nullable: true, name: 'release_date' })
  releaseDate: string

  @Column({ name: 'poster_id', type: 'uuid', nullable: true })
  poster_id: string

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null

  // один Фильм, много комментариев
  @OneToMany(() => ReviewEntity, (review) => review.movie, {
    onDelete: 'CASCADE',
  })
  reviews: ReviewEntity[]

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
