import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from './User';
import { Card } from './Card';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.boards)
  @JoinTable()
  users: User[];

  @OneToMany(() => Card, (card) => card.board)
  cards: Card[];
}
