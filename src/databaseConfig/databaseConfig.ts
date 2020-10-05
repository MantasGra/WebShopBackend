import { createConnection } from 'typeorm';
import { join, resolve } from 'path';

const connectToDatabase = async () => {
  if (process.env.ENVIRONMENT === 'PROD') {
    return await createConnection({
      type: 'mysql',
      host: process.env.RDS_HOSTNAME,
      port: process.env.RDS_PORT
        ? parseInt(process.env.RDS_PORT, 10)
        : undefined,
      database: process.env.RDS_DB_NAME,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      entities: [join(resolve(__dirname, '..'), 'entity', '**', '*.{ts,js}')],
      migrations: [
        join(resolve(__dirname, '..'), 'migration', '**', '*.{ts,js}')
      ]
    });
  } else {
    return await createConnection({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [join(resolve(__dirname, '..'), 'entity', '**', '*.{ts,js}')],
      migrations: [
        join(resolve(__dirname, '..'), 'migration', '**', '*.{ts,js}')
      ],
      logging: 'all'
    });
  }
};

export default connectToDatabase;
