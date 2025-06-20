import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Correo API')
    .setDescription('API para enviar y listar mensajes de correo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('NestJS application is starting', process.env.PORT ?? 3000);
  console.log('swagger is available at /api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
