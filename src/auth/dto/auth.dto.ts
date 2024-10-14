/* eslint-disable prettier/prettier */

import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @MinLength(3)
  @IsString()
  firstName?: string;

  @MinLength(3)
  @IsString()
  lastName?: string;
}

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
