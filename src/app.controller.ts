import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
import { StringToLowercasePipe } from 'src/common/pipes/string-to-lowercase.pipe'
import { UserAgent } from 'src/common/decorators/user-agent.decorator'
import { ResponseInterseptor } from 'src/common/interseptors/response.interseptor'


@ApiTags('App')
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

  //@UseFilters(AllExeptionsFilter)
  //@UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterseptor)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      username: 'Lena',
      email: 'support@mail.ru',
      userAgent,
    }
  }
}
