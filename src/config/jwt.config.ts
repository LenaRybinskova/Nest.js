import { ConfigService } from '@nestjs/config'
import type { JwtModuleOptions } from '@nestjs/jwt'

// getJWTConfig просто получает переменную JWT_SECRET из .env (через ConfigService
export async function getJWTConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.getOrThrow<string>('JWT_SECRET'),
    signOptions: { algorithm: 'HS256' },
  }
}
 // Сервер берёт данные пользователя (например, id), создаёт JWT — payload с этими данными, подписывает токен своим секретным ключом (JWT_SECRET) и отдаёт этот токен клиенту (UI).

//Клиент (например, браузер) получает этот токен и обычно хранит его в localStorage или cookie.
// Этот токен не меняется на клиенте — клиент просто хранит и отправляет его обратно серверу при каждом запросе.

//При следующем запросе клиент прикрепляет токен к заголовку Authorization: Bearer <токен>.

//Сервер получает токен, раскодирует его и с помощью своего секретного ключа пересчитывает подпись токена.
// Если подпись совпадает — значит токен подлинный и не изменён.
// Если нет — токен либо подделан, либо повреждён, и сервер отвергает запрос.
// Сервер только проверяет подпись, вычисляя её заново с помощью своего секрет, не хранит подпись, просто проверяет.