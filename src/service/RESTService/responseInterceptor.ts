import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RESTResponse } from './index';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // Formata todas as respostas de sucesso
      map((data) => RESTResponse(200, data, null)),
      // Captura e formata todos os erros
      catchError((error) => {
        const status = error instanceof HttpException ? error.getStatus() : 500; // Status padrão para erros genéricos

        const message =
          error.response?.message || // Mensagem detalhada se disponível
          error.message || // Mensagem padrão do erro
          'Internal Server Error'; // Mensagem padrão para erros desconhecidos

        // Formata o erro como um RESTResponse
        return Promise.resolve(RESTResponse(status, null, message));
      }),
    );
  }
}
