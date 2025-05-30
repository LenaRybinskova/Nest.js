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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class MovieDTO {
  @ApiProperty({description: "Название фильма",example:"Fight club", type:String})
  @IsNotEmpty() //@IsNotEmpty() значит ОБЯЗАТЕЛЬНОЕ ПОЛЕ
  @IsString()
  title: string

  @ApiProperty({description: "Год релиза",example:"2000", type:Number})
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear()) // чтобы дату дальше текущей нельзя было указать
  releaseYear: number

  @ApiPropertyOptional({description: "УРЛ",example:"http://", type:"string"})
  @IsOptional()
  @IsString()
  posterUrl?: string

  @ApiProperty({description: "Id актеров",example:["134645", "33333"], type:String})
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[]


}
