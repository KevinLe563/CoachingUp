import express, { Express, Request, Response, Router, ErrorRequestHandler, NextFunction } from 'express';
import bodyParser from "body-parser";

import { HttpError } from 'models/http-error';
import listingRouter from './routes/listing-routes';
import userRouter from 'routes/user-routes';

const app: Express = express();

app.use(bodyParser.json());

app.use('/api/listings', listingRouter);

app.use('/api/user', userRouter);

app.use((req, res, next) => {
    const error : HttpError = new HttpError('Page not found.', 404);
    return next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured."});
});

app.listen(5000);