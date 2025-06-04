import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterRequest } from 'src/auth/dto/registerRequest'
import { LoginRequest } from 'src/auth/dto/loginRequest'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) //201 ответ если все ок
  async register(@Body() dto: RegisterRequest) {
    return await this.authService.register(dto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) //200
  async login(@Body() dto: LoginRequest) {
    return await this.authService.login(dto)
  }
}
