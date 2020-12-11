import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
    await this.userService.createUser(userDto);
    return this.signIn(userDto.email);
  }

  async signIn(email: string): Promise<User> {
    const user = await this.userService.findUser({email});
    const payload = { email: user.email, id: user.id };
    user.token = this.jwtService.sign(payload);
    return this.userService.updateUser(user);
  }

  async signOut(token: string): Promise<User> {
    const tokenData: any = this.jwtService.decode(token);
    const {id, email} = tokenData;
    const user = await this.userService.findUser({id, email});
    user.token = null;
    return this.userService.updateUser(user);
  }

  async checkUserToken(token: string): Promise<string> {
    const tokenData: any = this.jwtService.decode(token);
    const {id, email} = tokenData;
    const user = await this.userService.findUser({id, email});

    if (!user) {
      return 'user does not exist';
    }
  }

  async checkUserExistence(email: string): Promise<string> {
    const user = await this.userService.findUser({email});

    if (user) {
      return 'email is registered';
    }
  }

  async checkUserIdentity(email: string, password: string): Promise<string> {
    const user = await this.userService.findUser({email});
    const isUserPass = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !isUserPass) {
      return 'invalid email or password';
    }
  }
}
