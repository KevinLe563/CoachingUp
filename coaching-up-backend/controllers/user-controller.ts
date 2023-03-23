import { NextFunction } from "express";
import { validationResult } from "express-validator/src/validation-result";
import {v4} from "uuid";

import { user1, users } from "@frontend/Testing/Constants/Constants";
import { AccountType } from "@frontend/Types/EnumTypes";
import { UserInfo } from "@frontend/Types/UserTypes";
import { HttpError } from "models/http-error";

function getUserById(req: any, res: any, next: NextFunction) {
    const userId = String(req.params.uid);
    const user = users.find(u => u.userId === userId);

    if (!user) {
        const error = new HttpError('User not found.', 404);
        return next(error);
    }

    res.json({user: user});
};

function loginUser(req: any, res: any, next: NextFunction) {
    const { email, password } = req.body;

    const identifiedUser = users.find(u => u.userEmail === email);

    if (!identifiedUser || identifiedUser.userPassword !== password) {
        const error = new HttpError('Invalid username or password.', 401);
        return next(error);
    }

    res.json({message: 'Logged in!'});
};

function signupUser(req: any, res: any, next: NextFunction) {
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        throw new HttpError("Invalid input, please check your data.", 422);
    }
    const { username, email, password } = req.body;

    if (users.find(u => u.userEmail === email)) {
        const error = new HttpError('Could not create user. Email already in use.', 422);
        return next(error);
    }
    // TODO: make sure to double check all fields exists, validation
    const createdUser : UserInfo = {
        userId: v4(),
        username,
        userEmail: email,
        userPassword: password,
        userType: AccountType.Client,
    }

    users.push(createdUser);

    res.status(201).json(createdUser);
};

export { getUserById, loginUser, signupUser };