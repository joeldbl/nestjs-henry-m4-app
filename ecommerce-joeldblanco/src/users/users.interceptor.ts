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
            let userCopy = { ...user };
            delete userCopy.password;
            return userCopy;
          });

        let userCopy = { ...value };
        delete userCopy.password;
        return userCopy;
      }),
    );
  }
}
