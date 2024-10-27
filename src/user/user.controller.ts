/* eslint-disable prettier/prettier */
import { GetUser } from '@/auth/decorators';
import { JwtGuard } from '@/auth/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User, @GetUser("email") email: string) {
    return {user, email};
  }
}
