import { createConnection } from 'typeorm';

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
      entities: ['src/entity/**/*.ts'],
      migrations: ['src/migration/**/*.ts']
    });
  } else {
    return await createConnection({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: ['src/entity/**/*.ts'],
      migrations: ['src/migration/**/*.ts'],
      logging: 'all'
    });
  }
};

export default connectToDatabase;
