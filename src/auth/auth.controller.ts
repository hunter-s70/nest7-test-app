import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Headers
} from '@nestjs/common';
import { UserDto } from '../users/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() userDto: UserDto): Promise<{token: string}> {
    const errors = await this.authService.validateSignUpFields(userDto);

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
  async signIn(@Body() userDto: UserDto): Promise<{token: string}> {
    const errors = await this.authService.validateSignInFields(userDto);

    if (errors) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        errors,
      }, HttpStatus.FORBIDDEN);
    }
    const user = await this.authService.signIn(userDto);
    return {
      token: user.token
    };
  }

  @Post('sign-out')
  async signOut(@Headers('authorization') authorization): Promise<any> {
    if (authorization) {
      const [, token] = authorization.split(' ');
      const errors = await this.authService.validateSignOutFields(token);

      if (errors) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          errors,
        }, HttpStatus.FORBIDDEN);
      }
      await this.authService.signOut(token);
      return {};
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
