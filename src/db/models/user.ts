import {DataTypes, Model} from "sequelize";
import uuidv4 from "uuid/v4";
import {db} from ".";
import {PasswordHelper} from "../../helpers";

export type Role = "user" | "admin";

export const roles = ["user", "admin"];

export class User extends Model {
  public password?: string;
 }

User.init({
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: "Email is required",
      },
      notNull: {
        msg: "A role must be provided",
      },
    },
  },
id: {
  autoIncrement: true,
  primaryKey: true,
  type: DataTypes.INTEGER,
},
username: {
  allowNull: false,
  type: DataTypes.STRING,
  validate: {
    notNull: {
      msg: "A username must be provided",
    },
  },
},
password: {
  allowNull: false,
  type: DataTypes.STRING,
  validate: {
    notNull: {
      msg: "A password must be provided",
    },
  },
},
role: {
  allowNull: false,
  type: DataTypes.STRING,
  validate: {
    isIn: {
      args: [roles],
      msg: `Role must be in ${roles.join(",")}`,
    },
    notNull: {
      msg: "A role must be provided",
    },

  },
},
  uuid: {
    defaultValue: () => uuidv4(),
    type: DataTypes.UUID,
  },
  avatar: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
createdAt: {
  type: DataTypes.DATE,
},
updatedAt: {
  type: DataTypes.DATE,
},
}, {tableName: "Users", sequelize: db.sequelize});

User.beforeCreate(async (user, options) => {
  user.password = await PasswordHelper.hashPassword(user.password);
});
