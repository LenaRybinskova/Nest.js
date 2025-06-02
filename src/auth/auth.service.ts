import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterRequest } from 'src/auth/dto/registerRequest'

@Injectable()
export class AuthService {
  constructor(private readonly prismaServis: PrismaService) {
  }

  async register(dto: RegisterRequest) {
    const { name, password, email } = dto

    //1 проверка может есть такой юзер уже.
    const existUser = await this.prismaServis.user.findUnique({
      where: { email },
    })

    //если юзер такой есть то выбр ошибку
    if (existUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует')
    }

    //2 сохр в БД
    const user = this.prismaServis.user.create({
      data: { name, email, password },
    })

    return user
  }
}
