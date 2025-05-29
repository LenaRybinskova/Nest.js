import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'


// он будет респонс оборачивать в объект с {status:"Ok", data:{}}
export class ResponseInterseptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(map((data) => ({ // next.handle() - аналог next в мидлваре, пропихивает запров след обработчик( пайп или контроллер), потом в Пайп можно сделать цыепочку операций с этим запросом.
      status: 'Ok',
      data,
    })))
  }
}