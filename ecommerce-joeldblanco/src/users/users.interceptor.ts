import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        if (Array.isArray(value))
          return value.map((user) => {
            delete user.password;
            return user;
          });

        delete value.password;
        delete value.isAdmin;
        return value;
      }),
    );
  }
}
