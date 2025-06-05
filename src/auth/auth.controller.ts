import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post, Res,

} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterRequest } from 'src/auth/dto/registerRequest'
import { LoginRequest } from 'src/auth/dto/loginRequest'
import { Response } from 'express'

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
}
