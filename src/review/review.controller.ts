import { Controller } from '@nestjs/common'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  /*
  @Post()
  createReview(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto)
  }*/
}
