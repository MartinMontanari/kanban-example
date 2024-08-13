import { Module } from '@nestjs/common';
import { AppController } from '../presentation/controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './config/Environment';
import { Role } from '../domain/entities/Role';
import { User } from '../domain/entities/User';
import { UserController } from '../presentation/controllers/user.controller';
import { repositories, services } from './config/Providers';
import { Card } from '../domain/entities/Card';
import { Board } from '../domain/entities/Board';
import { BoardController } from '../presentation/controllers/board.controller';
import { CardController } from '../presentation/controllers/card.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: environment.database.type as 'postgres',
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      database: environment.database.database,
      entities: [User, Role, Board, Card],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Role, Board, Card]),
  ],
  controllers: [AppController, UserController, BoardController, CardController],
  providers: [...services, ...repositories],
})
export class AppModule {}
