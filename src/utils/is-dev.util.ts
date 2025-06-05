import { ConfigService } from '@nestjs/config'

// просто получает данные из енв файла
export const isDev = (configService: ConfigService) =>
  configService.getOrThrow('NODE_ENV') === 'development'
