import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'Express'

//Гард должен возвращать тру\фолс и пропускать или останавливать обр запроса.
/*
@Injectable()
export class AuthGuard implements CanActivate {
  /!*canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request // получили ОБЪЕКТ запроса
    const token = request.headers['authorization']

    if (!token || !token?.startsWith('Bearer')) {
      throw new UnauthorizedException('Вы не авторизованы')
    }*!/

  return
  true
}
}
*/
