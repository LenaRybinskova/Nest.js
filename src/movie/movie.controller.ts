import { Controller } from '@nestjs/common';

/*@Controller({
  path: 'movie', // это тоже самое что мы так укажем @Controller('movie')
  host:"api.ru"  // откуда могут запросы приходить, напр с http://api.ru/movie
})*/

@Controller('movie')
export class MovieController {
  /*/!*!// если 1 парам надо вытащить
  /!*@Get()
  findAll(@Query("genre") genre:string){
    return  genre ?`Фильмы в жанре ${genre}`: [{ title: 'lll' }, { title: 'nnn' }]
  }*!/

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
  @Get('headersPage')
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

  // кастомный ответ, например для редиректа
  @Get('response')
  getResponse(@Res() res: Response) {
    res.status(201).json({ message: 'OK' });
  }

  @Get(':idTL/details/:idTask')
  getTask(@Param('idTL') idTL: string, @Param('idTask') idTask: string) {
    return `данные из Урла ${idTL} и ${idTask}`;
  }*!/
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id)
  }

  @Post()
  create(@Body() dto: MovieDTO) {
    return this.movieService.create(dto)
  }

  @Put(':id')
  updateMovie(@Param('id') id: string, @Body() dto: MovieDTO) {
    return this.movieService.updateMovie(id, dto)
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id)
  }*/
}
