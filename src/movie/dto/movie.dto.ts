import {
  IsArray,
  isArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'

export class MovieDTO {
  @IsNotEmpty() //@IsNotEmpty() значит ОБЯЗАТЕЛЬНОЕ ПОЛЕ
  @IsString()
  title: string

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear()) // чтобы дату дальше текущей нельзя было указать
  releaseYear: number

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[]

  @IsOptional()
  @IsString()
  posterUrl: string
}
