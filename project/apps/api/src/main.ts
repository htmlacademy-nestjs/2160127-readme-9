import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { RequestIdInterceptor } from '@project/interceptors';

const GLOBAL_PREFIX = 'api';
const SPEC_PREFIX = 'spec';
const PORT = process.env.PORT || '3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const config = new DocumentBuilder()
      .setTitle('API-сервис')
      .setDescription('Описание API-сервиса')
      .setVersion('1.0')
      .addBearerAuth(
        { type: "http", scheme: "bearer", bearerFormat: "JWT", name: "Authorization", description: "Enter JWT token", in: "header" },
        "Bearer"
    )
    .addSecurityRequirements("Bearer")
      .addTag(GLOBAL_PREFIX)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SPEC_PREFIX, app, document);

  await app.listen(PORT);

  Logger.log(`🚀 Swagger is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`);
}

bootstrap();
