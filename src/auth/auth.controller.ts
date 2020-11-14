import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
// import { User } from '../users/user.entity';
import { UserDto } from '../users/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() userDto: UserDto): Promise<{token: string}> {
    const errors = await this.authService.validateUser(userDto);

    if (errors) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        errors,
      }, HttpStatus.FORBIDDEN);
    }
    const user = await this.authService.signUp(userDto);
    return {
      token: user.token
    };
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
