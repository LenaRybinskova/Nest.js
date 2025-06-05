import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterRequest } from 'src/auth/dto/registerRequest'
import { hash, verify } from 'argon2'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/auth/interfaces/jwt.interface'
import { LoginRequest } from 'src/auth/dto/loginRequest'
import { Response } from 'express'
import { isDev } from 'src/utils/is-dev.util'

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string
  private readonly JWT_ACCESS_TOKEN_TTL: string
  private readonly JWT_REFRESH_TOKEN_TTL: string
  private readonly COOKIE_DOMAIN: string

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET')
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    )
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    )
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN')
  }

  async register(res: Response, dto: RegisterRequest) {
    const { name, password, email } = dto

    //1 проверка может есть такой юзер уже.
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    })

    //если юзер такой есть то выбр ошибку
    if (existUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует')
    }

    //2 сохр в БД
    const user = await this.prismaService.user.create({
      data: { name, email, password: await hash(password) },
    })
    return this.auth(res, user.id)
  }

  async login(res: Response, dto: LoginRequest) {
    const { password, email } = dto

    const existUser = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    })

    if (!existUser) {
      throw new NotFoundException('Пользователь не зарегистрирован') //404
    }

    const isValidPassword = await verify(existUser.password, password)

    if (!isValidPassword) {
      throw new NotFoundException('Пользователь не зарегистрирован') //404
    }

    return this.auth(res, existUser.id)
  }

  private auth(res: Response, id: string) {
    const { refreshToken, accessToken } = this.generateTokens(id)
    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    )
    return { accessToken }
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id } //на базе Ид будет создан Пейлод

    const accessToken = this.jwtService.sign(payload, {
      //Nest генерит аксесс токен с таким сроком жзини
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    })

    const refreshToken = this.jwtService.sign(payload, {
      //Nest генерит рефреш токен с таким сроком жзини
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    })

    return { accessToken, refreshToken }
  }

  //метолд чтобы РЕФРЕШ токен передать в куке
  private setCookie(res: Response, token: string, expires: Date) {
    res.cookie('LenaRefreshToken', token, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    })
  }
}
