import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  createReview(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto);
  }
}
