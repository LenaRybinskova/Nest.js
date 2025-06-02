import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterRequest } from 'src/auth/dto/registerRequest'
import { hash } from 'argon2'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/auth/interfaces/jwt.interface'

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string
  private readonly JWT_ACCESS_TOKEN_TTL: string
  private readonly JWT_REFRESH_TOKEN_TTL: string

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = configService.getOrThrow<string>('JWT_SECRET')
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    )
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    )
  }

  async register(dto: RegisterRequest) {
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
    return this.generateTokens(user.id)
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id } //на базе Ид будет создан Пейлод

    const accessToken = this.jwtService.sign(payload, { //Nest генерит аксесс токен с таким сроком жзини
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    })

    const refreshToken = this.jwtService.sign(payload, { //Nest генерит рефреш токен с таким сроком жзини
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    })

    return { accessToken, refreshToken}
  }
}
