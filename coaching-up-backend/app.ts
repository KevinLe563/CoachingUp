import express, { Express, Request, Response, Router, ErrorRequestHandler, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";

import { HttpError } from 'models/http-error';
import listingRouter from './routes/listing-routes';
import userRouter from 'routes/user-routes';

const app: Express = express();
dotenv.config();
const dbConnectionString = process.env.MONGODB_CONNECTION_URL;

app.use(bodyParser.json());

app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//     next();
// });

/* listing routes */
app.use('/api/listings', listingRouter);

/* user routes */
app.use('/api/user', userRouter);

/* Default invalid url response */
app.use((req, res, next) => {
    const error : HttpError = new HttpError('Page not found.', 404);
    return next(error);
});

/* error handler */
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured."});
});

if (dbConnectionString) {
    mongoose.connect(
        dbConnectionString
    ).then(() => {
        app.listen(5000);
    }).catch((error) => {
        console.log(error);
    });
} else {
    throw new Error("DB connection string not found.");
}