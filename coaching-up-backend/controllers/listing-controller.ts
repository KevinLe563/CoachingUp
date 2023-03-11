import { NextFunction } from "express";
import bodyParser from "body-parser";
import {v4} from "uuid";

import { HttpError } from "models/http-error";
import { user1, LISTINGS, coach, priceInfo } from '@frontend/Testing/Constants/Constants';
import { ListingInfo, ListingBody } from "@frontend/Types/ListingTypes";
import { ListingInteractionMethod } from "@frontend/Types/EnumTypes";

function getListingById(req: any, res: any, next: NextFunction) {
    const listingId = String(req.params.lid);
    const listing = LISTINGS.listings.find(l => {
        return l.listingId === listingId;
    })

    if (!listing) {
        const error : HttpError = new HttpError('Listing not found', 404);
        return next(error);
    } 
    
    return res.json({listing});
}

function createListing(req: any, res: any, next: NextFunction) {
    const { title, description } = req.body;
    const listingBody : ListingBody = {
        title,
        description,
        interactionMethod: ListingInteractionMethod.InPerson,
        coach,
        price: priceInfo
        // interactionMethod,
        // coach,
        // price,
    }

    const listingId = v4();
    console.log(listingId);
    const listingDate = new Date();

    const listingInfo : ListingInfo = {
        listingId,
        listingDate,
        listingBody
    }

    LISTINGS.listings.push(listingInfo);
    res.status(201).json({listing: listingInfo});
}

function updateListingById(req: any, res: any, next: NextFunction) {
    const { title, description } = req.body;
    const listingId = req.params.lid;

    const foundListing : ListingInfo | undefined = LISTINGS.listings.find(l => l.listingId === listingId);

    if (!foundListing) {
        const error : HttpError = new HttpError('Listing not found', 404);
        return next(error);
    }
    
    const updatedListing = {...foundListing};
    const listingIndex = LISTINGS.listings.findIndex(l => l.listingId === listingId);
    updatedListing.listingBody.title = title;
    updatedListing.listingBody.description = description;

    LISTINGS.listings[listingIndex] = updatedListing;
    res.status(200).json({listing: updatedListing })
}

function deleteListingById(req: any, res: any, next: NextFunction) {
    const listingId = req.params.lid;
    if (!LISTINGS.listings.find(l => l.listingId === listingId)) {
        const error : HttpError = new HttpError('Listing not found', 404);
        return next(error);
    }

    LISTINGS.listings = LISTINGS.listings.filter(l => l.listingId !== l.listingId);
    res.status(200).json({message: 'Deleted listing'});

}

export { getListingById, createListing, updateListingById, deleteListingById }; 