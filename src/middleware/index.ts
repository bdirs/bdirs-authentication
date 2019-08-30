import {
  validateRequestBody,
} from "./validators";

// All middleware will be stored here and exported through the index

import JoiValidator from "./Joi/Joi.validator";

export {
  validateRequestBody,
  JoiValidator,
};
