export const environment = {
  api: {
    port: process.env.API_PORT || 3000,
    host: process.env.API_HOST || 'localhost',
  },
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'kanban-example',
  },
};
