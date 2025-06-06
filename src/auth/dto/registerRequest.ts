import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    description:"Отображаемое имя",
    example:"Lena"
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @MaxLength(50, { message: 'максимум 50 символов' })
  name: string


  @ApiProperty({
    description:"почта",
    example:"Lena@m;k;"
  })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @IsEmail({}, { message: 'не формат почты' })
  email: string


  @ApiProperty({
    description:"пароль",
    example:"!lkldfeoire;",
    maxLength:50,
    minLength:6
  })
  @IsString({ message: 'Пароль должна быть строкой' })
  @IsNotEmpty({ message: 'обязательное поле' })
  @MinLength(6, { message: 'максимум 6 символов' })
  @MaxLength(50, { message: 'максимум 50 символов' })
  password: string
}
