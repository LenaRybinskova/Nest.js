import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateActorDto } from 'src/actor/dto/create-actor.dto'

export class CreateMovieRequest {
  @ApiProperty({
    description: 'Название фильма',
    example: 'Fight club',
    type: String,
  })
  @IsNotEmpty() //@IsNotEmpty() значит ОБЯЗАТЕЛЬНОЕ ПОЛЕ
  @IsString()
  title: string

  @ApiProperty({ description: 'Год релиза', example: '2000', type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear()) // чтобы дату дальше текущей нельзя было указать
  releaseYear: number

  @ApiPropertyOptional({
    description: 'УРЛ',
    example: 'http://',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  posterUrl?: string

  @ApiProperty({
    description: 'Id актеров',
    example: [
      'a5667169-7551-4a94-a253-020145d28a35',
      'b1ad9a9f-90b2-4932-b219-9f52f28df00f',
    ],
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[]
}

export class MovieResponseDto {
  @ApiProperty({ example: '20ab8083-31d3-4484-93a1-89f91aad01eb' })
  id: string

  @ApiProperty({ example: 'for deleted' })
  title: string

  @ApiProperty({ example: null, nullable: true })
  description: string | null

  @ApiProperty({ example: 1999 })
  releaseYear: number

  @ApiProperty({ example: 0 })
  reting: number

  @ApiProperty({ example: false })
  isAvailable: boolean

  @ApiProperty({
    example: 'COMEDY',
    enum: ['COMEDY', 'ACTION', 'DRAMA', 'HORROR'],
  })
  genre: string

  @ApiProperty({ example: '2025-05-30T11:15:37.671Z' })
  createdAt: string

  @ApiProperty({ example: '2025-05-30T11:15:37.671Z' })
  updateAt: string

  @ApiProperty({ example: 'd880d3fe-4f8f-41d1-b11c-7828316355f4' })
  posterId: string

  @ApiProperty({ type: [CreateActorDto] })
  actor: CreateActorDto[]
}
