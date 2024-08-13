import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignCardDto {
  @IsInt()
  @IsNotEmpty()
  cardId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
