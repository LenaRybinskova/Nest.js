import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from 'src/config/jwt.config'
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    // то что нужно для раб АУС модуля
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJWTConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
