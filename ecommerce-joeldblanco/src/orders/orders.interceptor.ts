import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
@Injectable()
export class OrdersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (response) => {
        delete response.user.password;
        delete response.user.isAdmin;
        return response;
      }),
    );
  }
}
