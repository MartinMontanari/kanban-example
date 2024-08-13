import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../domain/entities/User';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns A promise that resolves to an array of {@link User} objects.
   *
   * @throws Will throw an error if there is a problem with the database connection or query execution.
   */
  async findAll(): Promise<User[]> {
    console.info('UserService - Trying to get all users...');
    return await this.userRepository.findAll();
  }
}
