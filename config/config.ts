import { Dialect } from 'sequelize';

interface DBConfig {
  username: string ;
  password: string ;
  database: string ;
  host: string ;
  port: number; // Or use `number | undefined` if you parse the port
  dialect: Dialect;
}

interface Config {
  development: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
  },
  production: {
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
  },
};

export default config;