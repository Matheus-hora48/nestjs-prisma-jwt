import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors = {
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  };

  const config = new DocumentBuilder()
    .setTitle('Api Monitor Web')
    .setDescription('Api do monitor web feita em nestjs')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('usuario')
    .addTag('cidades')
    .addTag('filiais')
    .addTag('prospect')
    .addTag('venda')
    .addTag('orcamento')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors(cors);
  await app.listen(3000);
}
bootstrap();
