import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   // To handle dto validation
   app.useGlobalPipes(new ValidationPipe());

   // To configure API documentation
   const config = new DocumentBuilder()
      .setTitle('Seller Module')
      .setDescription('Seller platform API')
      .setVersion('1.0')
      .addTag('API list:')
      .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   // app.setGlobalPrefix('seller')

   await app.listen(3000);
}
bootstrap();
