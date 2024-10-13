import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(): {
        msg: string;
    };
    signIn(): {
        msg: string;
    };
}
