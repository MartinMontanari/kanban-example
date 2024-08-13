import { DataSource } from 'typeorm';
import { User } from '../src/domain/entities/User';
import { Role } from '../src/domain/entities/Role';
import { Board } from '../src/domain/entities/Board';
import { Card } from '../src/domain/entities/Card';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'kanban-example',
  entities: [User, Role, Board, Card],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const roleRepository = dataSource.getRepository(Role);
  const userRepository = dataSource.getRepository(User);
  const boardRepository = dataSource.getRepository(Board);
  const cardRepository = dataSource.getRepository(Card);

  // Create roles
  const adminRole = new Role();
  adminRole.name = 'admin';

  const developerRole = new Role();
  developerRole.name = 'developer';

  await roleRepository.save([adminRole, developerRole]);

  // Create users
  const user1 = new User();
  user1.name = 'John Doe | Tech-Leader';
  user1.email = 'johndoe@example.com';
  user1.roles = [adminRole, developerRole];

  const user2 = new User();
  user2.name = 'Pedro de Santa Fe | Developer 1';
  user2.email = 'pedroFromSantaFe@example.com';
  user2.roles = [developerRole];

  const user3 = new User();
  user3.name = 'Ayrton Senna | Developer 2';
  user3.email = 'ayrtonSenna@example.com';
  user3.roles = [developerRole];

  await userRepository.save([user1, user2, user3]);

  const board = new Board();
  board.name = 'Sample Board - 1';
  await boardRepository.save(board);

  // Create 5 Cards and associate each one with the Board created
  const uc = ['Technology', 'Design', 'Management', 'Operations', 'Finance'];
  const cardStatus = ['To Do', 'In Progress', 'Done'];

  for (let i = 0; i < 5; i++) {
    const card = new Card();
    card.title = `Card ${i} - Create new ${uc[i]}`;
    card.description = `Issue description for Card ${i}`;
    const randomCardStatus = Math.floor(Math.random() * cardStatus.length);
    card.status = cardStatus[randomCardStatus];
    card.board = board; // Associate the Card with the Board

    await cardRepository.save(card);
  }
  await dataSource.destroy();

  console.log('Seeding completed');
}

seed()
  .then(() => console.log('Seed completed'))
  .catch((error) => console.error('Seed failed', error));

// COMMAND TO EXECUTE THIS SCRIPT
// npx ts-node ./db-seed/seed.ts
