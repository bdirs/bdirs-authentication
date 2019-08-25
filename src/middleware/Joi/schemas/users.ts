import * as Joi from "@hapi/joi";
import { IUser } from "../../../types";

export const userSchema = (data: IUser) => {
  const schema = {
    password: Joi.string()
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .required(),
    username: Joi.string().required(),
  };
  return Joi.validate(data, schema, { abortEarly: false });
};
