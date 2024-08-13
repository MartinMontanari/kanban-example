import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Board } from '../../domain/entities/Board';
import { BoardRepository } from '../../infrastructure/repositories/BoardRepository';
import { Card } from '../../domain/entities/Card';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';

@Injectable()
export class BoardService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: BoardRepository,
    @Inject(CardRepository)
    private readonly cardRepository: CardRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Retrieves a board by its ID.
   *
   * @param id The ID of the board to retrieve.
   * @returns A promise that resolves to the requested board.
   */
  async findOneById(id: number): Promise<Board> {
    console.info(`BoardService - Trying to get the board...${id}`);
    return await this.boardRepository.findOneById(id);
  }
  /**
   * Assigns a card to a user.
   *
   * This function retrieves a card and a user from their respective repositories,
   * checks if they exist, and then assigns the user to the card.
   * If either the card or the user is not found, a NotFoundException is thrown.
   *
   * @param boardId - The ID of the board received.
   * @param cardId - The ID of the card to assign.
   * @param userId - The ID of the user to assign the card to.
   * @returns A promise that resolves to the updated card.
   * @throws NotFoundException - If either the card or the user is not found.
   */
  async assignCardToUser(
    boardId: number,
    cardId: number,
    userId: number,
  ): Promise<Card> {
    const board = await this.boardRepository.findOneById(boardId);
    const card = await this.cardRepository.findOneById(cardId);
    const user = await this.userRepository.findOneById(userId);

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    card.userAssigned = user;
    return this.cardRepository.save(card);
  }
}
