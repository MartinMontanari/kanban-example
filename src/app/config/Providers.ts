import { AppService } from '../../app.service';
import { UserService } from '../../application/services/UserService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { BoardService } from '../../application/services/BoardService';
import { BoardRepository } from '../../infrastructure/repositories/BoardRepository';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';
import { CardsService } from '../../application/services/CardService';

export const services = [AppService, UserService, BoardService, CardsService];
export const repositories = [UserRepository, BoardRepository, CardRepository];
