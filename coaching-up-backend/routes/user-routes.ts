import express, { Express, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { getUserById, signupUser, loginUser } from 'controllers/user-controller';
import { user1, listings } from '@frontend/Testing/Constants/Constants';

const userRouter: Router = express.Router();

userRouter.get('/:uid', getUserById);

userRouter.post('/login', loginUser);
userRouter.post('/signup', [check('username').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({ min: 6 })], signupUser);

export default userRouter;

