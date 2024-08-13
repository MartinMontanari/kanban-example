<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Kanban example API based on [Nest](https://github.com/nestjs/nest) framework and developed using TypeScript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# creates a .env file in project root, paste this credentials
API_PORT=3000
API_HOST=localhost

DB_TYPE: 'postgres'
DB_HOST: 'localhost'
DB_PORT: 5432
DB_USER: 'root'
DB_PASSWORD: 'root'
DB_NAME: 'kanban-example'

# run docker container for PostgreSQL db connection
$ docker compose up

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
You have available a postman collection in the `postman-collection` folder.
To seed the db with mock data, see the file `db-seed/seed.ts`. The command to execute it is ` npx ts-node ./db-seed/seed.ts`.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Martín Montanari

## License

Nest is [MIT licensed](LICENSE).
