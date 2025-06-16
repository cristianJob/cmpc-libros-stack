import { AuthService } from './auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Acceso denegado');

    const [, token] = authHeader.split(' ');

    try {
      this.authService.validateToken(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
