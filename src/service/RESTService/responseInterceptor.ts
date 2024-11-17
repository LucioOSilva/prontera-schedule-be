import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RESTResponse } from './index';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // Formata todas as respostas
      map((data) => {
        return RESTResponse(200, data, null);
      }),
      // Formata todos os erros
      catchError((error) => {
        const status = error.getStatus ? error.getStatus() : 500;
        const message = error.message || 'Internal Server Error';
        return throwError(() => RESTResponse(status, null, message));
      }),
    );
  }
}
