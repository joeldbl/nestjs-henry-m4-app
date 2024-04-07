import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader: string = request.headers.authorization;
    if (!authorizationHeader) throw new UnauthorizedException();

    const headerType: string = authorizationHeader.split(' ')[0];
    if (headerType !== 'Basic') throw new UnauthorizedException();

    const headerCredentials: string = authorizationHeader.split(' ')[1];
    const [email, password] = headerCredentials.split(':');

    if (!email || !password) throw new UnauthorizedException();

    return true;
  }
}
