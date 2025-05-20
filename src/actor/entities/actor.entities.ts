import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MovieEntity } from 'src/movie/entities/movie.entity'

@Entity({ name: 'actors' })
export class ActorEntity {
  @PrimaryGeneratedColumn('uuid') //генерирует автом ИД
  id: string

  @Column({ type: 'varchar', length: 50 })
  name: string

  @ManyToMany(() => MovieEntity, (movie) => movie.actors)
  movies: MovieEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
