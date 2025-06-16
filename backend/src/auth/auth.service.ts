import { Injectable, BadRequestException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  login(user: { id: string | number }) {
    const payload = { id: user.id };
    return {
      access_token: sign(payload, this.configService.get('JWT_SECRET')!),
    };
  }

  validateToken(token: string) {
    try {
      return verify(token, this.configService.get('JWT_SECRET')!);
    } catch {
      throw new BadRequestException('Token Invalido');
    }
  }
}
