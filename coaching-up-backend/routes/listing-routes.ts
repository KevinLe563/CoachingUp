import express, { Express, Request, Response, Router } from 'express';

import { getListingById, createListing, updateListingById, deleteListingById } from 'controllers/listing-controller';
import { user1, LISTINGS } from '@frontend/Testing/Constants/Constants';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', getListingById);

listingRouter.post('/', createListing);

listingRouter.patch('/:lid', updateListingById);

listingRouter.delete('/:lid', deleteListingById);

export default listingRouter;

