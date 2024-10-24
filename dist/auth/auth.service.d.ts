import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signIn(data: LoginDto): Promise<{
        access_token: string;
    }>;
    signUp(data: RegisterDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: string, email: string): Promise<{
        access_token: string;
    }>;
}
