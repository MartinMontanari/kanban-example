import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from './Board';
import { User } from './User';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['To Do', 'In Progress', 'Done'] })
  status: string;

  @ManyToOne(() => Board, (board) => board.cards)
  board: Board;

  @ManyToOne(() => User, (user) => user.cards)
  userAssigned: User;
}
