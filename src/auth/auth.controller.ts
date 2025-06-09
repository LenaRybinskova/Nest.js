import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterRequest } from 'src/auth/dto/registerRequest'
import { LoginRequest } from 'src/auth/dto/loginRequest'
import { Response, Request } from 'express'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthResponse } from 'src/auth/dto/auth.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'Создает новый аккаунт пользователя',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Некорректные входные данных' }) // это при валидации выбросит
  @ApiConflictResponse({
    description: 'Пользователь с такой почтой уже существует',
  }) // это в Сервисе выбросит throw new ConflictException('Пользователь с такой почтой уже существует')
  @Post('register')
  @HttpCode(HttpStatus.CREATED) //201 ответ если все ок
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto)
  }

  @ApiOperation({
    summary: 'Вход в систему',
    description: 'Авторизует пользователя и выдает токен доступа',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Некорректные входные данных' }) // это при валидации выбросит
  @ApiNotFoundResponse({ description: 'Пользователь не зарегистрирован' })
  @Post('login')
  @HttpCode(HttpStatus.OK) //200
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto)
  }

  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Генерирует новый токен доступа',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: 'Нет refresh-токен' })
  @ApiNotFoundResponse({ description: 'Проблемы с верификацией токена' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK) //200
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res)
  }

  @ApiOperation({ summary: 'Выход из системы' })
  @Post('logout')
  @HttpCode(HttpStatus.OK) //200
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('@me')
  @HttpCode(HttpStatus.OK) //200
  async me(@Req() req: Request) {
    return req.user
  }
}
