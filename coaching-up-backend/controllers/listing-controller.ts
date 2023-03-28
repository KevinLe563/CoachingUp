import { NextFunction } from "express";
import { validationResult } from "express-validator/src/validation-result";
import bodyParser from "body-parser";
import {v4} from "uuid";

import { HttpError } from "models/http-error";
import ListingModel from "models/listing";
import { user1, listings as listingsConstant, coach, priceInfo } from '@frontend/Testing/Constants/Constants';
import { Listing } from "@frontend/Types/ListingTypes";
import { PriceInfo } from "@frontend/Types/PriceTypes";
import { ListingInteractionMethod, TimeIntervals } from "@frontend/Types/EnumTypes";

let listings : Listing[] = listingsConstant;

function getListingById(req: any, res: any, next: NextFunction) {
    const listingId = String(req.params.lid);
    const listing = listings.find(l => {
        return l.listingId === listingId;
    })

    if (!listing) {
        const error : HttpError = new HttpError('Listing not found', 404);
        return next(error);
    } 
    
    return res.json({listing});
}

function getAllListingsByUserId(req: any, res: any, next: NextFunction) {
    const userId = req.params.uid;

    const userListings : Listing[] = listings.filter(l => l.userId === userId);
    if (!userListings || userListings.length === 0) {
        const error = new HttpError('Could not find any listings for the specified user.', 404);
        return next(error);
    }

    return res.json({userListings});
}

async function createListing(req: any, res: any, next: NextFunction) {
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
        throw new HttpError("Invalid input, please check your data.", 422);
    }

    const {
      title,
      description,
      coachId,
      interactionMethod,
      price,
      timeInterval,
      userId,
    } = req.body;
    const priceInfo : PriceInfo = {price, interval: timeInterval};
    const createdListing = new ListingModel({
        creationDate: new Date(),
        title,
        description,
        coachId,
        interactionMethod,
        priceInfo,
        userId
    });
    try {
        await createdListing.save();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Listing creation failed.', 500));
    }

    res.status(201).json({listing: createdListing});
}

function updateListingById(req: any, res: any, next: NextFunction) {
    // const validationErros = validationResult(req);
    // if (!validationErros.isEmpty()) {
    //     throw new HttpError("Invalid input, please check your data.", 422);
    // }
    // const { title, description } = req.body;
    // const listingId = req.params.lid;

    // const foundListing : Listing | undefined = listings.find(l => l.listingId === listingId);

    // if (!foundListing) {
    //     const error : HttpError = new HttpError('Listing not found', 404);
    //     return next(error);
    // }
    
    // const updatedListing = {...foundListing};
    // const listingIndex = listings.findIndex(l => l.listingId === listingId);
    // updatedListing.listingBody.title = title;
    // updatedListing.listingBody.description = description;

    // listings[listingIndex] = updatedListing;
    // res.status(200).json({listing: updatedListing })
}

function deleteListingById(req: any, res: any, next: NextFunction) {
    const listingId = req.params.lid;
    if (!listings.find(l => l.listingId === listingId)) {
        const error : HttpError = new HttpError('Listing not found', 404);
        return next(error);
    }

    listings = listings.filter(l => l.listingId !== l.listingId);
    res.status(200).json({message: 'Deleted listing'});

}

export { getListingById, getAllListingsByUserId, createListing, updateListingById, deleteListingById }; 