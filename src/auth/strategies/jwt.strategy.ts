import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from 'src/auth/auth.service'
import { ConfigService } from '@nestjs/config'
import { JwtPayload } from 'src/auth/interfaces/jwt.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // запрет принимать просроч токены
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      algorithms: ['HS256'],
    })
  }

  // validate сраб автом если с токеном все ок
  async validate(payload: JwtPayload) {
    // тут будет вызываться метод из АусСервиса
    return await this.authService.validate(payload.id)
  }
}
