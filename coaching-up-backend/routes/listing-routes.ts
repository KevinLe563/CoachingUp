import express, { Express, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { getListingById, getAllListingsByUserId, createListing, updateListingById, deleteListingById } from 'controllers/listing-controller';
import { user1, listings } from '@frontend/Testing/Constants/Constants';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', getListingById);
listingRouter.get('/user/:uid', getAllListingsByUserId);

listingRouter.post('/', [check('title').not().isEmpty(), check('description').isLength({min: 5})], createListing);

listingRouter.patch('/:lid', [check('title').not().isEmpty(), check('description').isLength({min: 5})], updateListingById);

listingRouter.delete('/:lid', deleteListingById);

export default listingRouter;