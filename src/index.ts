import express, { Express } from 'express';
import OAuth2Server from 'oauth2-server';
import dotenv from 'dotenv';

import OAuthModel from './auth/auth-model';
import connectToDatabase from './databaseConfig/databaseConfig';
import router from './routes';
import { errorHandler } from './routes/utility-handlers/error-handler';

import 'reflect-metadata';

dotenv.config();

export interface ExpressApp extends Express {
  oauth?: OAuth2Server;
}

async function main() {
  const app: ExpressApp = express();

  app.oauth = new OAuth2Server({
    model: OAuthModel
  });

  const connection = await connectToDatabase();

  await connection.runMigrations();

  app.use(router(app as Required<ExpressApp>));
  app.use(errorHandler);

  const port = process.env.port || 3000;
  app.listen(port);
}

main().catch(console.error);
