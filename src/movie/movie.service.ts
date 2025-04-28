import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MovieService {
  constructor(private readonly UserService: UserService) {}

  async test() {
    return this.UserService.test();
  }
}
