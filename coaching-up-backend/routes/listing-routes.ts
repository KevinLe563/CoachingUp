import express, { Express, Request, Response, Router } from 'express';

import { getListingById, createListing } from 'controllers/listing-controller';
import { user1, LISTINGS } from '@frontend/Testing/Constants/Constants';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', getListingById);

listingRouter.post('/', createListing);

export default listingRouter;

