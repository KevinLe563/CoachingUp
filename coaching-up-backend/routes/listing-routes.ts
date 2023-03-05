import express, { Express, Request, Response, Router } from 'express';

import { user1, LISTINGS } from '@frontend/Testing/Constants/Constants';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', (req, res, next) => {
    console.log('GET Request in listing');
    res.json({message: 'Working'});
});

export default listingRouter;

