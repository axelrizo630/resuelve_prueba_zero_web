import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Resuelve Prueba Zero')
    .setDescription('Resuelve Prueba Zero API technical test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
