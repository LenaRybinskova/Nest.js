import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateReviewDto } from 'src/review/dto/create-review.dto'
import { Review } from '@prisma/client'

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

  constructor(private readonly prismaService: PrismaService) {}

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const { movieId, text, rating } = dto

    return this.prismaService.review.create({
      data: { text, rating, movie: { connect: { id: movieId } } },
    }) // в табл Ревью в колонку movie подставит movieId
  }
}
