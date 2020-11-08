import { Controller, Post } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(): Promise<any> {
    // ToDo: add create user
    return '';
  }

  @Post('sign-in')
  async signIn(): Promise<any> {
    // ToDo: add login user
    return '';
  }

  @Post('sign-out')
  async signOut(): Promise<any> {
    // ToDo: add user detection
    return '';
  }
}
