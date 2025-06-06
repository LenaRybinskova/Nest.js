import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post, Req, Res,

} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterRequest } from 'src/auth/dto/registerRequest'
import { LoginRequest } from 'src/auth/dto/loginRequest'
import { Response , Request} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) //201 ответ если все ок
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) //200
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK) //200
  async refresh(@Req() req:Request ,
                @Res({ passthrough: true }) res: Response, ) {
    return await this.authService.refresh( req, res)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK) //200
  async logout(@Res({ passthrough: true }) res: Response, ) {
    return await this.authService.logout(  res)
  }
}
