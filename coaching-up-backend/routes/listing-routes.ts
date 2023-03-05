import express, { Express, Request, Response, Router } from 'express';

import { user1, LISTINGS } from '@frontend/Testing/Constants/Constants';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', (req, res, next) => {
    const listingId = Number(req.params.lid);
    const listing = LISTINGS.listings.find(l => {
        return l.listing_id === listingId;
    })
    res.json({listing});
});

listingRouter.get('', (req, res, next) => {

});

export default listingRouter;

