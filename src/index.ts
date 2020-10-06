import express from 'express';
import 'reflect-metadata';
import connectToDatabase from './databaseConfig/databaseConfig';
import dotenv from 'dotenv';
import router from './routes';
import { errorHandler } from './routes/utility-handlers/error-handler';

dotenv.config();

async function main() {
  const app = express();

  const connection = await connectToDatabase();

  await connection.runMigrations();

  app.use(router);
  app.use(errorHandler);

  const port = process.env.port || 3000;
  app.listen(port);
}

main().catch(console.error);
