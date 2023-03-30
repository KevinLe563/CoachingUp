import { NextFunction } from "express";
import { validationResult } from "express-validator/src/validation-result";
import {v4} from "uuid";

import UserModel from "models/user";
import { user1, users } from "@frontend/Testing/Constants/Constants";
import { AccountType } from "@frontend/Types/EnumTypes";
import { User } from "@frontend/Types/UserTypes";
import { HttpError } from "models/http-error";

function getUserById(req: any, res: any, next: NextFunction) {
    // const userId = String(req.params.uid);
    // TODO: this method may not make sense, we should only be getting the current logged in user not by the id


    // res.json({user: user});
};

async function loginUser(req: any, res: any, next: NextFunction) {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await UserModel.findOne({ email: email });
    } catch(error) {
        console.log(error);
        return next(new HttpError('Login failed. Please try again later.', 500));
    }

    if (!existingUser || existingUser.password !== password) {
        return next(new HttpError('Invalid username or password. Try again.', 401));
    }

    res.json({message: 'Logged in!'});
};

async function signupUser(req: any, res: any, next: NextFunction) {
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        return next(new HttpError("Invalid input, please check your data.", 422));
    }
    const { fname, lname, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await UserModel.findOne({ email: email });
    } catch(error) {
        console.log(error);
        return next(new HttpError('Signup failed. Try again later.', 500));
    }

    if (existingUser) {
        return next(new HttpError('User already exists. Please login instead.', 422));
    }

    // TODO: make sure to double check all fields exists, validation
    const createdUser = new UserModel({
        fname,
        lname,
        email,
        password,
        listings: []
    });

    try {
        await createdUser.save();
    } catch(error) {
        console.log(error);
        return next(new HttpError('Signup failed. Try again later.', 500));
    }

    res.status(201).json({user: createdUser.toObject({ getters: true })});
};

export { getUserById, loginUser, signupUser };