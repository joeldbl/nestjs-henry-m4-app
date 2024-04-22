import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader: string = request.headers.authorization;
    if (!authorizationHeader)
      throw new UnauthorizedException('Bearer token not found');

    const headerType: string = authorizationHeader.split(' ')[0];
    if (headerType !== 'Bearer')
      throw new UnauthorizedException('Invalid token');

    const headerToken: string = authorizationHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET;

      const payload = this.jwtService.verify(headerToken, {
        secret,
      });
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);

      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
