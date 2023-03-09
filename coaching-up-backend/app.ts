import express, { Express, Request, Response, Router, ErrorRequestHandler, NextFunction } from 'express';
import bodyParser from "body-parser";

import listingRouter from './routes/listing-routes';

const app: Express = express();

app.use(bodyParser.json());

app.use('/api/listings', listingRouter)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured."});
});

app.listen(5000);