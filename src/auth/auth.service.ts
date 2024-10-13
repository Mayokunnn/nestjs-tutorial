/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signIn() {
    return {msg : 'Hello, I have signed in'}
  }

  signUp() {
    return { msg: 'Hello, I have signed up' };
  }
}
