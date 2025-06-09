import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';


const GLOBAL_PREFIX = 'user';
const SPEC_PREFIX = 'spec';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.setGlobalPrefix(GLOBAL_PREFIX);

const configService = app.get(ConfigService);
const PORT = configService.get('application.port');

    const config = new DocumentBuilder()
      .setTitle('User-сервис')
      .setDescription('Описание User-сервиса')
      .setVersion('1.0')
      .addTag(GLOBAL_PREFIX)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SPEC_PREFIX, app, document);

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
    }));

  await app.listen(PORT);

  Logger.log(`🚀 Swagger is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`);
}

bootstrap();
