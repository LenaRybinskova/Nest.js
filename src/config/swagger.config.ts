import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Lena API')
    .setDescription('My API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
}
