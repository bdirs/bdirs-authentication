import {
  validateRequestBody,
} from "./validators";
export { validateCreateAdmin } from "./validators";
export { validateRoleExistence, validateUserExistence } from "./existence-middleware";
export { isAuthenticated, isSuperAdmin } from "./authentication-middleware";
// All middleware will be stored here and exported through the index

import JoiValidator from "./Joi/Joi.validator";

export {
  validateRequestBody,
  JoiValidator,
};
