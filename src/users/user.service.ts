import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(userData: UserDto): Promise<User> {
    const encryptedPass = await bcrypt.hash(userData.password, 10);
    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.password = encryptedPass;
    return await this.usersRepository.save(user);
  }

  async updateUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findUser(searchParams): Promise<User> {
    return await this.usersRepository.findOne(searchParams);
  }
}
