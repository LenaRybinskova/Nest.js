import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginRequest {
  @ApiProperty({
    description: 'Почта',
    example: 'klj;j@lkldfeoire;',
  })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @IsEmail({}, { message: 'не формат почты' })
  email: string

  @ApiProperty({
    description: 'пароль',
    example: '!lkldfeoire;',
    maxLength: 50,
    minLength: 6,
  })
  @IsString({ message: 'Пароль должна быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @MinLength(6, { message: 'максимум 6 символов' })
  @MaxLength(50, { message: 'максимум 50 символов' })
  password: string
}
