import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3000'] });

  const config = new DocumentBuilder()
    .setTitle('Биллинг договоров')
    .setDescription('Документация апи')
    .setVersion('1.0.0')
    .addTag('CMA')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  //for global validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server start on port = ${PORT}`));
}
start();
