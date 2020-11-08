import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(userData: {
    email: string,
    username: string,
    password: string
  }): Promise<User> {
    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.password = userData.password;
    return this.usersRepository.save(user);
  }

  async findUser(email: string): Promise<User> {
    return this.usersRepository.findOne({email});
  }
}
