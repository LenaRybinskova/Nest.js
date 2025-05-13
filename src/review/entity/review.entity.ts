import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid') //генерирует автом ИД
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0.0 })
  rating: number;

  @Column({ type: 'uuid', name: 'movie_id' })
  movieId: string;

  @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  }) //CASCADE если сущность удалить, она везде каскадно удалиться
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
