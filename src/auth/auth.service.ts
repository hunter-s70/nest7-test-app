import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async signIn(user: User): Promise<User> {
    // ToDo: add token generation
    user.token = 'generated_token';
    return this.usersRepository.save(user);
  }

  async signOut(user: User): Promise<User> {
    user.token = null;
    return this.usersRepository.save(user);
  }
}
