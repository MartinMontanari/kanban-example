import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { Board } from '../../domain/entities/Board';
import { BoardService } from '../../application/services/BoardService';
import { Card } from '../../domain/entities/Card';
import { AssignCardDto } from '../adapters/board/AssignCardDto';

@Controller('v1/boards')
export class BoardController {
  constructor(
    @Inject(BoardService)
    private readonly boardService: BoardService,
  ) {}

  @Get(':id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    try {
      console.info(`BoardController - Getting board by ID...${id}`);
      // TODO made adapter for input validation and transformation
      // TODO implements cqrs
      return this.boardService.findOneById(id);
    } catch (error) {
      console.error(
        `An error occurred retrieving the board:', ${error?.message}`,
      );
    }
  }

  @Post(':id/user-card-assign')
  async assignCardToUser(
    @Param('id') id: number,
    @Body() assignCardDto: AssignCardDto,
  ): Promise<Card> {
    try {
      const cardId: number = assignCardDto.cardId;
      const userId: number = assignCardDto.userId;

      return this.boardService.assignCardToUser(id, cardId, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
