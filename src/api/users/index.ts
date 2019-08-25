import { Router } from "express";

import {
  validateRequestBody,
} from "../../middleware";
import { userController } from "./user-controller";

const router = Router();

router.post(
  "/login",
  validateRequestBody,
  userController.loginUser.bind(userController),
);

router.get("/", userController.findAllRecords.bind(userController));

export default router;
