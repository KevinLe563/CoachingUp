import express, { Express, Request, Response, Router } from 'express';


const listingRouter: Router = express.Router();

listingRouter.get('/', (req, res, next) => {
    console.log('GET Request in listing');
    res.json({message: 'Working'});
});

export default listingRouter;

