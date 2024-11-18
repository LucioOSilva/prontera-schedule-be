import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  ExceptionInterceptorFilter,
  ResponseInterceptor,
} from './service/RESTService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Gera erro se propriedades não definidas forem enviadas - NOTA: remover pois pode facilitar falhas de segurança
      transform: true, // Transforma dados para o tipo desejado, por exemplo, de string para número
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ExceptionInterceptorFilter());
  await app.listen(process.env.PORT ?? 3333);
}

bootstrap();
