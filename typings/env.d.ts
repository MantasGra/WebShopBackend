declare namespace NodeJS {
  export interface ProcessEnv {
    ENVIRONMENT: 'PROD' | 'DEV';
    RDS_HOSTNAME?: string;
    RDS_PORT?: string;
    RDS_DB_NAME?: string;
    RDS_USERNAME?: string;
    RDS_PASSWORD?: string;
    DB_HOSTNAME?: string;
    DB_PORT?: string;
    DB_NAME?: string;
    DB_USERNAME?: string;
    DB_PASSWORD?: string;
  }
}
