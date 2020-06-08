import {celebrate, Joi, Segments} from "celebrate";
import { Router } from "express";

import {
  isAuthenticated, isProfileOwner,
  isSuperAdmin,
  validateCreateAdmin,
  validateRequestBody,
  validateUserExistence,
} from "../../middleware";
import { IRequest, userController } from "./user-controller";

const router = Router();

router.post(
  "/login",
  validateRequestBody,
  (req, res, next) => userController.loginUser(req, res),
);

router.post(
  "/admin",
  isAuthenticated,
  isSuperAdmin,
  validateCreateAdmin,
  validateUserExistence,
  (req: IRequest, res, next) => userController.addAdmin(req, res),
  );

router.get(
  "/",
  isAuthenticated,
  isSuperAdmin,
  (req, res, next) => userController.findAllRecords(req, res),
  );

router.get(
  "/:uuid",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      uuid: Joi.string().required().uuid(),
    }),
  }),
  (req, res) => userController.findOneRecord(req, res),
);

router.post(
  "/password-request",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  }),
  (req, res, next) => userController.resetPasswordRequest(req, res),
);

router.patch(
  "/password/:token/confirmation",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required(),
    }),
  }),
  (req, res, next) => userController.resetPasswordConfirmation(req, res),
);

router.get(
  "/profile/me",
  isAuthenticated,
  (req, res, next) => userController.me(req as IRequest, res),
);

router.patch(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string(),
    }).min(1),
  }),
  isProfileOwner,
  (req, res) => userController.updateRecord(req, res),
);
export default router;
