import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.signIn(userDto);
  }

  async signIn(userDto: UserDto): Promise<User> {
    const {email} = userDto;
    const user = await this.userService.findUser({email});
    const payload = { email: user.email, id: user.id };
    user.token = this.jwtService.sign(payload);
    return await this.userService.updateUser(user);
  }

  async signOut(token: string): Promise<User> {
    const tokenData: any = this.jwtService.decode(token);
    const {id, email} = tokenData;
    const user = await this.userService.findUser({id, email});
    user.token = null;
    return await this.userService.updateUser(user);
  }

  validateToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        errors: [err.message],
      }, HttpStatus.FORBIDDEN);
    }
  }

  async validateSignUpFields(userDto: UserDto): Promise<string[] | null> {
    const errors = [];
    const {username, email, password} = userDto;
    const emailError = this.checkEmail(email);
    const passwordError = this.checkPassword(password);
    const usernameError = this.checkUsername(username);
    const userError = await this.checkUserExistence(userDto);

    if (emailError) {
      errors.push(emailError);
    }
    if (passwordError) {
      errors.push(passwordError);
    }
    if (usernameError) {
      errors.push(usernameError);
    }
    if (userError) {
      errors.push(userError);
    }

    return errors.length ? errors: null;
  }

  async validateSignInFields(userDto: UserDto): Promise<string[] | null> {
    const errors = [];
    const {email, password} = userDto;
    const emailError = this.checkEmail(email);
    const passwordError = this.checkPassword(password);
    const userError = await this.checkUser(userDto);

    if (emailError) {
      errors.push(emailError);
    }
    if (passwordError) {
      errors.push(passwordError);
    }
    if (userError && !errors.length) {
      errors.push(userError);
    }

    return errors.length ? errors: null;
  }

  async validateSignOutFields(token: string): Promise<string[] | null> {
    const errors = [];
    const tokenData: any = this.jwtService.decode(token);
    const {id, email} = tokenData;

    if (tokenData) {
      const user = await this.userService.findUser({id, email});
      if (!user) {
        errors.push('usr does not exist');
      }
    }

    return errors.length ? errors: null;
  }

  async checkUserExistence(userDto: UserDto): Promise<string> {
    const {email} = userDto;
    const user = await this.userService.findUser({email});

    if (user) {
      return 'email is registered';
    }
  }

  async checkUser(userDto: UserDto): Promise<string> {
    const {email, password} = userDto;
    const user = await this.userService.findUser({email});
    const isUserPass = await bcrypt.compare(password, user.password);

    if (!user || !isUserPass) {
      return 'invalid email or password';
    }
  }

  checkUsername(username: string): string {
    if (!username) {
      return 'username is required';
    } else if (username.length > 40) {
      return 'max username is 16 characters';
    }
  }

  checkPassword(password: string): string {
    if (!password) {
      return 'password is required';
    } else if (password.length > 30) {
      return 'max password is 30 characters';
    }
  }

  checkEmail(email: string): string {
    if (!email) {
      return 'email is required';
    } else if (!this.validateEmail(email)) {
      return 'email is not valid';
    } else if (email.length > 40) {
      return 'max email is 40 characters';
    }
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
