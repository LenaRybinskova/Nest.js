import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

/*@Controller({
  path: 'movie', // это тоже самое что мы так укажем @Controller('movie')
  host:"api.ru"  // откуда могут запросы приходить, напр с http://api.ru/movie
})*/

@Controller('movie')
export class MovieController {
  // если 1 парам надо вытащить
  /*@Get()
  findAll(@Query("genre") genre:string){
    return  genre ?`Фильмы в жанре ${genre}`: [{ title: 'lll' }, { title: 'nnn' }]
  }*/

  // если несколько парам надо вытащить
  @Get()
  findAll2(@Query() queryParams: any) {
    // вместо эни должно быть ДТО
    return JSON.stringify(queryParams);
  }

  @Post()
  create(@Body('title') title: string) {
    return `Фильмы ${title} добавлен.`;
  }

  // вытащить ВСЕ хедерс
  @Get('headers')
  getHead(@Headers() headers: any) {
    return headers;
  }

  // вытащить конкретно что то из Хедерс
  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }

  // вытащить ВСЕ параметры запроса(хедерс, боди.. )
  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return { method: req.method }; // если вернуть чисто req то будет 500 ошибка..это связ с серилизацией сложного объекта req, надо всегда вытягивать конкретные поля
  }
}
