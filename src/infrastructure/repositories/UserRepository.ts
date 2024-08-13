import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/User';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns A promise that resolves to an array of {@link User} objects.
   * Each user object includes their associated roles.
   */
  async findAll(): Promise<User[]> {
    console.info('UserRepository - Trying to fetch all users...');
    return this.userRepository.find({ relations: ['roles'] });
  }

  /**
   * Retrieves a single board by its unique identifier.
   *
   * @param id - The unique identifier of the board to retrieve.
   * @returns A Promise that resolves to the found User entity.
   *          If no User is found with the given ID, a NotFoundException is thrown.
   * @throws NotFoundException - If no User is found with the given ID.
   */
  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
