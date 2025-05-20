import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { CreateReviewDto } from 'src/review/dto/create-review.dto'
import { MovieService } from 'src/movie/movie.service'
import { ReviewEntity } from 'src/review/entity/review.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    public readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService,
  ) {}

  async createReview(dto: CreateReviewDto): Promise<ReviewEntity> {
    const { movieId, text, rating } = dto
    const movie = await this.movieService.findById(movieId)
    const review = this.reviewRepository.create({ movie, text, rating })
    return await this.reviewRepository.save(review)
  }
}
