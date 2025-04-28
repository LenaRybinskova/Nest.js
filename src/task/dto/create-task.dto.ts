import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { StartWith } from 'src/common/decorators/start-with-decoraor';

export enum TaskTag {
  'WORK' = 'work',
  'STUDY' = 'study',
  'HOME' = 'home',
}

export class CreateTaskDto {
  //СТРОКИ
  @IsString({ message: 'Мое сообщение, название должно быть строкой' })
  @IsNotEmpty()
  //@MinLength(2)
  //@MaxLength(10)
  @Length(2, 10)
  // КАСТОМНЫЙ ДЕКОРАТОР ДЛЯ ВАЛИДАЦИИ
  @StartWith('Task')
  title: string;

  @IsOptional()
  @IsString({ message: 'Мое сообщение, название должно быть строкой' })
  description: string;

  //ЧИСЛА
  /*  @IsNumber({}, { message: 'Приоритет должен быть числом' })*/ // число
  @IsInt({ message: 'Приоритет должен быть числом' }) // целочисленное
  @IsOptional() // не обязатальный паарметр
  @IsPositive({ message: 'Число должно быть больше 0' }) // число больше 0
  priority: number; // приоритет таски

  //МАССИВЫ СТРОК, ЕНАМ
  @IsArray({ message: 'Теги должны быть массивом.', each: true })
  // @IsString({ message: 'Тег должен быть строкой' })
  @IsEnum(TaskTag, { message: 'Недопустимое значение тега' })
  @IsOptional()
  // tags: string[];
  tags: TaskTag;

  /*//РЕГУЛЯРКИ можно использовать
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,10}$/, {
    message: 'Пароль должен содержать цифры, буквы  и тд',
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string;

  //URLS
  @IsUrl(
    {
      require_protocol: true,
      protocols: ['https', 'wss'],
      host_whitelist: ['google', 'youtube'],
      host_blacklist: ['bing'],
    },

    { message: 'некорректный формат УРЛа' },
  )
  websiteURL: string;

  @IsUUID('4') // 4 самая частоиспользуемая uuid версия. если у ИД на 13 месте тостоит 4 значит это 4 версия
  userId: string;*/
}
