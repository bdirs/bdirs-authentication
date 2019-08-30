import { Router } from 'express';

import {
  validateRequestBody,
} from '../../middleware/validators';
import { user } from './User.controller';

const router = Router();

router.post(
  '/login',
  validateRequestBody,
  user.loginUser.bind(user),
);

router.get('/', user.findAllRecords.bind(user));

export default router;
