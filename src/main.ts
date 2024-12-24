import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  ExceptionInterceptorFilter,
  ResponseInterceptor,
} from './service/RESTService';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  mongoose.set('toJSON', {
    versionKey: false, // Remove o campo `__v`
    // virtuals: true, // Inclui campos virtuais
    // transform: (doc, ret) => {
    //   ret.id = ret._id; // Adiciona o campo `id`
    //   delete ret._id; // Remove o campo `_id`
    //   return ret;
    // },
  });

  app.enableCors({
    origin: '*', // Permitir requisições de qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  });

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
