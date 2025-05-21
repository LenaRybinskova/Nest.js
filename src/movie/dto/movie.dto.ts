import {
  IsArray,
  isArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'

export class MovieDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear()) // чтобы дату дальше текущей нельзя было указать
  releaseYear: number

  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[]

  @IsString()
  posterUrl: string
}
