import { Injectable, NestMiddleware } from '@nestjs/common'
import type { NextFunction } from 'express'


//Middleware перехв запрос раньше чем он попадет в контролер
// Middleware может быть глобальный или локальным для конкр сущности.
// зарегистрировать его можно неск способами: в арр модуле - глобально.
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request: ${req.method} ${req.url}`);
    next()
  }
}