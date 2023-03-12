
import { user1, users } from "@frontend/Testing/Constants/Constants";
import { AccountType } from "@frontend/Types/EnumTypes";
import { UserInfo } from "@frontend/Types/UserTypes";
import { NextFunction } from "express";
import { HttpError } from "models/http-error";
import {v4} from "uuid";

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

    // const identifiedUser = users.find(u => u.e)
};

function signupUser(req: any, res: any, next: NextFunction) {
    const { username, email, password } = req.body;

    const createdUser : UserInfo = {
        userId: v4(),
        username,
        userType: AccountType.Client,
    }

    res.status(201).json(createdUser);
};

export { getUserById, loginUser, signupUser };