import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(data: RegisterDto): Promise<{
        access_token: string;
    }>;
    signIn(data: LoginDto): Promise<{
        access_token: string;
    }>;
}
