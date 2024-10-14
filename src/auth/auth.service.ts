/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signIn(data: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      const isCorrectPassword = await argon.verify(user.hash, data.password);

      if (!isCorrectPassword) {
        throw new ForbiddenException('Incorrect password');
      }

      delete user.hash

      return {data: user}
    } catch (error) {
      throw new InternalServerErrorException(error, "Something went wrong")
    }
  }

  async signUp(data: RegisterDto) {
    try {
      const hashedPassword = await argon.hash(data.password);

      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          hash: hashedPassword,
          firstName: data?.firstName,
          lastName: data?.lastName,
        },
      });

      delete user.hash;

      return { data: user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }

      throw new InternalServerErrorException("Something went wrong")
    }
  }
}
