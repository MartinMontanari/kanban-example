import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Param,
  Patch,
} from '@nestjs/common';
import { Card } from '../../domain/entities/Card';
import { ChangeCardStatusDto } from '../adapters/card/ChangeCardStatusDto';
import { CardsService } from '../../application/services/CardService';

@Controller('v1/cards')
export class CardController {
  constructor(
    @Inject(CardsService)
    private readonly cardService: CardsService,
  ) {}

  @Patch(':cardId/change-status')
  async changeCardStatus(
    @Param('cardId') id: number,
    @Body() changeCardStatusDto: ChangeCardStatusDto,
  ): Promise<Card> {
    try {
      const userId: number = changeCardStatusDto.userId;
      const cardStatus: string = changeCardStatusDto.cardStatus;
      return await this.cardService.updateCardStatus(id, userId, cardStatus);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
