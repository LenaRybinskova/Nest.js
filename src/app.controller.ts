import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test2')
  getHello(): string {
    return this.appService.getHello()
  }

  /*  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    console.log('Movie: ', title)
  }

  //@UseFilters(AllExeptionsFilter)
  @UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterseptor)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      username: 'Lena',
      email: 'support@mail.ru',
      userAgent,
    }
  }*/
}
