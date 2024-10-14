import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
