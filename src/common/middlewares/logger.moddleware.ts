import type { NextFunction } from 'express'

/*
//Middleware перехв запрос раньше чем он попадет в контролер
// Middleware может быть глобальный или локальным для конкр сущности.
// зарегистрировать его можно неск способами: в арр модуле - глобально, тогда надо писать как КЛАСС.
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request: ${req.method} ${req.url}`);
    next()
  }
}*/


// как функция. если подключаем в main.ts
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request: ${req.method} ${req.url}`)
  next()
}
