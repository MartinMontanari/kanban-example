import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';
import { BoardRepository } from '../../infrastructure/repositories/BoardRepository';
import { Card } from '../../domain/entities/Card';

@Injectable()
export class CardsService {
  constructor(
    @Inject(CardRepository)
    private readonly cardRepository: CardRepository,
    @Inject(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}

  async updateCardStatus(
    cardId: number,
    userId: number,
    cardStatus: string,
  ): Promise<Card> {
    const card = await this.cardRepository.findOneById(cardId);
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    if (!card.userAssigned) {
      throw new UnprocessableEntityException(
        'The card is not assigned to anyone, so the status cannot be updated',
      );
    }

    card.status = cardStatus;
    return this.cardRepository.save(card);
  }
}
