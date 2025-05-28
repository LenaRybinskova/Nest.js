import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { AppService } from './app.service'
import { StringToLowercasePipe } from 'src/common/pipes/string-to-lowercase.pipe'
import { AuthGuard } from 'src/common/guards/auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test2')
  getHello(): string {
    return this.appService.getHello()
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    console.log('Movie: ', title)
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile() {
    return {
      id: 1,
      username: 'Lena',
      email: 'support@mail.ru',
    }
  }
}
