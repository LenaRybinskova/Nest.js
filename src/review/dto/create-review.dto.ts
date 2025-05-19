import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator'

export class CreateReviewDto {
  @IsUUID('4')
  movieId: string

  @IsString()
  text: string

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number
}
