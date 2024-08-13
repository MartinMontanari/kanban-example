import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ChangeCardStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['To Do', 'In Progress', 'Done'])
  cardStatus: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
