import express from 'express';

import { loginUser, registerUser } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginValidator, registerValidator } from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', registerValidator, validateRequest, registerUser);
router.post('/login', loginValidator, validateRequest, loginUser);

export default router;
