import { Router } from "express";

import {
  isAuthenticated,
  isSuperAdmin,
  validateCreateAdmin,
  validateRequestBody,
  validateRoleExistence,
  validateUserExistence,
} from "../../middleware";
import { userController } from "./user-controller";

const router = Router();

router.post(
  "/login",
  validateRequestBody,
  userController.loginUser.bind(userController),
);

router.post(
  "/admin",
  isAuthenticated,
  isSuperAdmin,
  validateCreateAdmin,
  validateRoleExistence,
  validateUserExistence,
  userController.addAdmin.bind(userController),
  );

router.get(
  "/",
  userController.findAllRecords.bind(userController),
  );

export default router;
