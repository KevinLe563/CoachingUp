import express, { Express, Request, Response, Router } from 'express';

import listingRouter from './routes/listing-routes';

const app: Express = express();

app.use('/api/listings', listingRouter)

app.listen(5000);