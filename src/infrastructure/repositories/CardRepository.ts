import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../../domain/entities/Card';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  /**
   * Saves a new or updates an existing card in the database.
   *
   * @param card - The card entity to be saved or updated.
   * @returns A Promise that resolves to the saved card entity.
   * @throws Error - If any error occurs during the save operation.
   */
  async save(card: Card): Promise<Card> {
    return await this.cardRepository.save(card);
  }

  /**
   * Retrieves a single card by its unique identifier.
   *
   * @param id - The unique identifier of the card to retrieve.
   * @returns A Promise that resolves to the found card entity.
   *          If no Card is found with the given ID, a NotFoundException is thrown.
   * @throws NotFoundException - If no Card is found with the given ID.
   */
  async findOneById(id: number): Promise<Card> {
    const board = await this.cardRepository.findOne({
      where: { id },
      relations: ['userAssigned', 'board'],
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return board;
  }
}
