import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization || '';
    const [, token] = authorization.split(' ');
    if (token) {
      return this.validateToken(token);
    }
    return false;
  }

  validateToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        errors: [err.message],
      }, HttpStatus.FORBIDDEN);
    }
  }
}
