import express, { Express, Request, Response, Router } from 'express';

import { user1, LISTINGS } from '@frontend/Testing/Constants/Constants';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', (req, res, next) => {
    const listingId = Number(req.params.lid);
    const listing = LISTINGS.listings.find(l => {
        return l.listing_id === listingId;
    })

    if (!listing) {
        const error: any = new Error('Listing not found');
        error.code = 404;
        return next(error);
    } 
    
    return res.json({listing});
});

export default listingRouter;

