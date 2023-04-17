import express, { Express, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { imageUpload } from 'middleware/file-upload';
import { getUserById, signupUser, loginUser } from 'controllers/user-controller';

const userRouter: Router = express.Router();

userRouter.get('/:uid', getUserById);

userRouter.post('/login', loginUser);
userRouter.post('/signup', imageUpload.single('image'), signupUser);

export default userRouter;

