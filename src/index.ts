import express, { Request, Response } from 'express';
import 'reflect-metadata';
import connectToDatabase from './databaseConfig/databaseConfig';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const app = express();

  const connection = await connectToDatabase();

  await connection.runMigrations();

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome');
  });

  const port = process.env.port || 3000;
  app.listen(port, () => {
    console.log('Test');
  });
}

main().catch(console.error);
