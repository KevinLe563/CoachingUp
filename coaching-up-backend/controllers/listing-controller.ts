import { NextFunction } from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator/src/validation-result";

import { HttpError } from "models/http-error";
import ListingModel from "models/listing";
import UserModel from "models/user";
import { PriceInfo } from "@frontend/Types/PriceTypes";

async function getListingById(req: any, res: any, next: NextFunction) {
    const listingId = String(req.params.lid);
    let listing;
    try {
        listing = await ListingModel.findById(listingId);
    } catch(error) {
        console.log(error);
        return next(new HttpError('Something went wrong. Could not find listing.', 500));
    }
    
    if (!listing) {
        return next(new HttpError('Could not find listing for provided id', 404));
    }

    return res.json({listing: listing.toObject({getters: true})});
}

async function getListingsByUserId(req: any, res: any, next: NextFunction) {
    const userId = String(req.params.uid);

    let listings;
    try {
        listings = await ListingModel.find({ userId: userId });
    } catch(error) {
        console.log(error);
        return next(new HttpError('Something went wrong. Could not find listings for given user.', 500));
    }

    return res.json({listings: listings.map(listing => listing.toObject({getters: true}))});
}

async function createListing(req: any, res: any, next: NextFunction) {
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        return next(new HttpError("Invalid input, please check your data.", 422));
    }

    const {
      title,
      description,
      interactionMethod,
      price,
      timeInterval,
      userId,
    } = req.body;
    const priceInfo : PriceInfo = {price, interval: timeInterval};

    let user;
    try {
        user = await UserModel.findById(userId);
    } catch(error) {
        return next(new HttpError('Listing creation failed. Try again later.', 500));
    }

    if (!user) {
        return next(new HttpError('Cannot create listing for user. User does not exist.', 404));
    }

    const createdListing = new ListingModel({
        creationDate: new Date(),
        title,
        description,
        interactionMethod,
        priceInfo,
        userId
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdListing.save({ session: session });
        user.listings.push(createdListing._id);
        await user.save({session: session});
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Listing creation failed.', 500));
    }

    res.status(201).json({listing: createdListing});
}

async function updateListingById(req: any, res: any, next: NextFunction) {
    const listingId = String(req.params.lid);

    const { title, description } = req.body;

    let listing;
    try {
        listing = await ListingModel.findById(listingId);
    } catch(error) {
        console.log(error);
        return next(new HttpError('Something went wrong. Could not find listing.', 500));
    }
    
    if (!listing) {
        return next(new HttpError('Could not find listing for provided id', 404));
    }
    listing.title = title;
    listing.description = description;

    try {
        listing.save();
    } catch(error) {
        console.log(error);
        return next(new HttpError('Something went wrong. Could not update listing.', 500));
    }

    return res.json({listing: listing.toObject({getters: true})});
}

async function deleteListingById(req: any, res: any, next: NextFunction) {
    const listingId = String(req.params.lid);
    
    let listing;
    try {
        // listing = await ListingModel.findById(listingId).populate<{ userId: User}>('userId');
        listing = await ListingModel.findById(listingId);
    } catch(error) {
        console.log(error);
        return next(new HttpError('Something went wrong. Could not delete listing.', 500)); 
    }

    if (!listing) {
        return next(new HttpError('Could not delete listing. Listing does not exist.', 500)); 
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await UserModel.findByIdAndUpdate(listing.userId, {$pull: {listings: listingId}}, {session: session});
        await ListingModel.findByIdAndRemove(listingId, {session: session});
        await session.commitTransaction();
    } catch(error) {
        console.log(error);
        return next(new HttpError('Something went wrong. Could not delete listing.', 500));
    }

    res.status(200).json({message: 'Deleted listing.'});
}

export { getListingById, getListingsByUserId, createListing, updateListingById, deleteListingById }; 