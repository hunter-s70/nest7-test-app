import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  async signIn(user: User): Promise<User> {
    // ToDo: add token generation
    user.token = 'generated_token';
    return user.save();
  }

  async signOut(user: User): Promise<User> {
    user.token = null;
    return user.save();
  }
}
