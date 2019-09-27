// All project configurations will be stored here
import * as dotenv from "dotenv";
dotenv.config();

export const SUPER_ADMIN_EMAIL: string = process.env.SUPER_ADMIN_EMAIL;
export const SUPER_ADMIN_PASSWORD: string = process.env.SUPER_ADMIN_PASSWORD;
export const SECRET_KEY: string = process.env.SECRET_KEY;
export const EMAIL_USER: string = process.env.EMAIL_USER;
export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD;
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const PORT: number = Number(process.env.PORT);
export const DSN: string = "https://5ed302e0f47d4935ad60ce898f3ff79a@sentry.io/1521028";

export const databaseConfig = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "localhost",
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    use_env_variable: "DATABASE_URL",
    logging: false,
  },
  test: {
    url: process.env.DATABASE_URL,
    use_env_variable: "DATABASE_URL",
  },
  production: {
    url: process.env.DATABASE_URL,
    use_env_variable: "DATABASE_URL",
    logging: false,
  },
};
