import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from '../../domain/entities/Board';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  /**
   * Retrieves a single board by its unique identifier.
   *
   * @param id - The unique identifier of the board to retrieve.
   * @returns A Promise that resolves to the found board entity.
   *          If no board is found with the given ID, a NotFoundException is thrown.
   * @throws NotFoundException - If no board is found with the given ID.
   */
  async findOneById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['cards', 'cards.userAssigned'],
      order: {
        cards: {
          id: 'ASC',
        },
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return board;
  }
}
