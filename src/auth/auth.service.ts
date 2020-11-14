import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(userDto: UserDto): Promise<User> {
    const user = await this.userService.createUser(userDto);
    return await this.signIn(user);
  }

  async signIn(user: User): Promise<User> {
    const payload = { username: user.username, id: user.id };
    user.token = this.jwtService.sign(payload);
    return await this.userService.updateUser(user);
  }

  // async signOut(user: User): Promise<User> {
  //   user.token = null;
  //   return user;
  // }

  async validateUser(userDto: UserDto): Promise<string[] | null> {
    const errors = [];
    const {username, email, password} = userDto;
    const user = await this.userService.findUser(email);

    if (!email) {
      errors.push('email is required')
    } if (!this.validateEmail(email)) {
      errors.push('email is not valid')
    } else if (email.length > 40) {
      errors.push('max email is 40 characters')
    } else if (user) {
      errors.push('email has already in use')
    }

    if (!username) {
      errors.push('username is required')
    } else if (username.length > 16) {
      errors.push('max username is 16 characters')
    }

    if (!password) {
      errors.push('password is required')
    } else if (password.length > 30) {
      errors.push('max password is 30 characters')
    }

    return errors.length ? errors: null;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
