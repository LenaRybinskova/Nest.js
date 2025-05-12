import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';

export enum Genre {
  ACTION = 'action',
  HORROR = 'horror ',
  COMEDY = 'comedy',
  DRAMA = 'drama',
}

@Entity({ name: 'movie' })
export class MovieEntity {
  /*  @PrimaryGeneratedColumn() //генерирует автом ИД*/
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', length: 128 }) //varchar значит текст поле
  title: string;

  @Column({ type: 'text', nullable: true }) //nullable значит может быть необязательным полем
  description: string;

  @Column({ type: 'int', unsigned: true, name: 'release_year' }) //unsigned -только положительные могут быть числа , name назв столбца в Бикипер
  releaseYear: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0.0 }) //precision -3хзначное число, scale - колво цифр после запятой, default знач при создании дефолтное
  rating: number;

  @Column({ default: false, name: 'is_available' })
  isAvailable: boolean;

  @Column({ type: 'enum', enum: Genre, default: Genre.COMEDY })
  genre: Genre;

  @Column({ type: 'date', nullable: true, name: 'release_date' })
  releaseDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
