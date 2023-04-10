import express, { Express, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { getListingById, getListingsByUserId, createListing, updateListingById, deleteListingById } from 'controllers/listing-controller';

const listingRouter: Router = express.Router();

listingRouter.get('/:lid', getListingById);
listingRouter.get('/user/:uid', getListingsByUserId);

listingRouter.post('/', [check('title').not().isEmpty(), check('description').isLength({min: 5})], createListing);

listingRouter.patch('/:lid', [check('title').not().isEmpty(), check('description').isLength({min: 5})], updateListingById);

listingRouter.delete('/:lid', deleteListingById);

export default listingRouter;