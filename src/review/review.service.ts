import { Injectable } from '@nestjs/common'

@Injectable()
export class ReviewService {
  /* constructor(
    @InjectRepository(ReviewEntity)
    public readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService,
  ) {}

  async createReview(dto: CreateReviewDto): Promise<ReviewEntity> {
    const { movieId, text, rating } = dto
    const movie = await this.movieService.findById(movieId)
    const review = this.reviewRepository.create({ movie, text, rating })
    return await this.reviewRepository.save(review)
  }*/
}
