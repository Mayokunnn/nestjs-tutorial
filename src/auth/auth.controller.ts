/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: RegisterDto) {
    return this.authService.signUp(data);
  }

  @Post('signin')
  signIn(@Body() data: LoginDto) {
    return this.authService.signIn(data);
  }
}
