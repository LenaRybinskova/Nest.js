import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common'
import { MovieService } from 'src/movie/movie.service'
import { MovieDTO } from 'src/movie/dto/movie.dto'
import {
  ApiBody,
  ApiHeader, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

/*@Controller({
  path: 'movie', // это тоже самое что мы так укажем @Controller('movie')
  host:"api.ru"  // откуда могут запросы приходить, напр с http://api.ru/movie
})*/




@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  // TYPEORM
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
  constructor(private readonly movieService: MovieService) {}
  @ApiOperation({
    summary: 'Получить все фильмы',
    description: 'Возвращает все доступные фильмы',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Фильмы найдены' }) //HttpStatus.OK === 200
  @Get()
  getAll() {
    return this.movieService.findAll()
  }

  @ApiOperation({ summary: 'Получить фильм по ID', description: 'Возвращаем инфо о фильме', })
  @ApiParam({ name: 'id', type: 'string', description: 'ID фильма' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации' })
  @ApiQuery({ name: 'year', type: 'number', description: 'Фильтр по году' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Фильм найден' })
  //@ApiOkResponse({description: 'Фильм найден' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Фильм не найден swagger',example:{status:404,message:"Фильм не найден" , timestamp:"2222", path:"/movie/id"} }) //404
  //@ApiNotFoundResponse({description: 'Фильм не найден swagger'}) //404
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id)
  }

  @ApiOperation({
    summary: 'Создать фильм',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', "Twin picks" },
        releaseYear: { type: 'number' },
        actorsIds: { type: 'array' },
        posterUrl: { type: 'string' },
      },
    },
  })
  @Post()
  create(@Body() dto: MovieDTO) {
    return this.movieService.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDTO) {
    return this.movieService.updateMovie(id, dto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.deleteMovie(id)
  }
}
