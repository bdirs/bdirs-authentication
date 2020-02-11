import path from "path";
import { Sequelize } from "sequelize";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import { databaseConfig as conf } from "../../config";

const config = conf[env];
const db = {
  sequelize: null,
  // tslint:disable-next-line:object-literal-sort-keys
  Sequelize: null,
};

if (config.use_env_variable) {
  db.sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config.use_env_variable && env === "test") {
  db.sequelize = new Sequelize("sqlite::memory:");
} else {
  db.sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export  { db };
