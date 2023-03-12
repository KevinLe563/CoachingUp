import express, { Express, Request, Response, Router } from 'express';

import { getListingById, getAllListingsByUserId, createListing, updateListingById, deleteListingById } from 'controllers/listing-controller';
import { user1, listings } from '@frontend/Testing/Constants/Constants';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', getListingById);
listingRouter.get('/user/:uid', getAllListingsByUserId);

listingRouter.post('/', createListing);

listingRouter.patch('/:lid', updateListingById);

listingRouter.delete('/:lid', deleteListingById);

export default listingRouter;

