import {Router} from "express";
import { isAuthenticated, isSuperAdmin } from "../../middleware";
import {rolesController} from "./roles-controller";
const router = Router();

router.get(
  "",
  isAuthenticated,
  isSuperAdmin,
  rolesController.findAllRecords.bind(rolesController),
);

export default router;
