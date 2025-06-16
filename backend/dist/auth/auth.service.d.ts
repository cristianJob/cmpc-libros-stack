import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    constructor(configService: ConfigService);
    login(user: {
        id: string | number;
    }): {
        access_token: string;
    };
    validateToken(token: string): string | import("jsonwebtoken").JwtPayload;
}
