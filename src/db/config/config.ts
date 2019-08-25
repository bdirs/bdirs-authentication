const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "localhost",
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    use_env_variable: "DATABASE_URL",
    logging: false
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
