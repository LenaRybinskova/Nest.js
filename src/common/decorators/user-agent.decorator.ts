import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

// UserAgent декоратор возвращает из запроса из хедерс user-agent - это имя браузера
export const UserAgent = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request

    return request.headers['user-agent']
  },
)
