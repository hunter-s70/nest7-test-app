import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Users list.', type: [User]})
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch(err) {
      return err;
    }
  }
}
