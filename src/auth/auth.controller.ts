import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Headers,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiHeader
} from '@nestjs/swagger';
import { UserDto } from '../users/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  @ApiResponse({ status: 201, description: 'User created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async signUp(@Body(new ValidationPipe({groups: ['sign-up']})) userDto: UserDto): Promise<{token: string}> {
    const errors = await this.authService.checkUserExistence(userDto.email);

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
  @ApiResponse({ status: 201, description: 'User logged in.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async signIn(@Body() userDto: UserDto): Promise<{token: string}> {
    const {email, password} = userDto;
    const errors = await this.authService.checkUserIdentity(email, password);

    if (errors) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        errors,
      }, HttpStatus.FORBIDDEN);
    }
    const user = await this.authService.signIn(email);
    return {
      token: user.token
    };
  }

  @Post('sign-out')
  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({ status: 201, description: 'User logged out.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async signOut(@Headers('authorization') authorization): Promise<any> {
    const [, token] = authorization.split(' ');
    const errors = await this.authService.checkUserToken(token);

    if (errors) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        errors,
      }, HttpStatus.FORBIDDEN);
    }
    await this.authService.signOut(token);
    return {};
  }
}
