import express, { Express, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { getUserById, signupUser, loginUser } from 'controllers/user-controller';

const userRouter: Router = express.Router();

userRouter.get('/:uid', getUserById);

userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);

export default userRouter;

