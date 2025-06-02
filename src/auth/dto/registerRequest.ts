import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class RegisterRequest {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @MaxLength(50, { message: 'максимум 50 символов' })
  name: string
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @IsEmail({}, { message: 'не формат почты' })
  email: string

  @IsString({ message: 'Пароль должна быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @MinLength(6, { message: 'максимум 6 символов' })
  @MaxLength(50, { message: 'максимум 50 символов' })
  password: string
}
