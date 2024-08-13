import { Controller, Get, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/User';
import { UserService } from '../../application/services/UserService';

@Controller('v1/users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    try {
      console.info('UserController - Starting to find all users UC');
      return this.userService.findAll();
    } catch (error) {
      console.error(
        `An error occurred retrieving the users:', ${error?.message}`,
      );
    }
  }
}
