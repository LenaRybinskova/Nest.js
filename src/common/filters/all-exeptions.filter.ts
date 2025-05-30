import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common'
import type { Response } from 'express'

// Обработчик ошибок, срабатывае только на исключения.
@Catch()
export class AllExeptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExeptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost): any {
    console.log('exception', exception)
    console.log('host', host)
    const context = host.switchToHttp() // берем только запрос HTTP
    const response = context.getResponse() as Response // Будем логгировать то что будем возвращать на фронт
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500 // HttpException это NotFoundException, BadRequestException, UnauthorizedException,  InternalServerErrorException
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error'

    this.logger.error(message, exception) // передали всю инфу себе в логгер( для термнала)

    response.status(status).json({
      // это уйдет на клиен как респонс
      status,
      message,
      timestamp: new Date().toISOString(),
      path: context.getRequest().url, //Какой путь вызвал ошибку.
    })
  }
}

//logger нужен чтобы выводить сообщения в консоль в ее стандартном виде, как console.log встроенный метод
// catch срабатывает после исключения.
//
