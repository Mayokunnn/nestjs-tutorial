import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '@/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signIn(data: LoginDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            hash: string;
            firstName: string | null;
            lastName: string | null;
        };
    }>;
    signUp(data: RegisterDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            hash: string;
            firstName: string | null;
            lastName: string | null;
        };
    }>;
}
