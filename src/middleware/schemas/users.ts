import * as Joi from "@hapi/joi";

export const userSchema = {
    password: Joi.string()
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .required(),
    username: Joi.string().required(),
};

export const addAdminSchema = {
  roleId: Joi.number().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
