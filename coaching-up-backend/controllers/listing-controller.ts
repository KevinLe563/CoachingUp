import { NextFunction } from "express";
import bodyParser from "body-parser";
import {v4} from "uuid";

import { user1, LISTINGS, coach, priceInfo } from '@frontend/Testing/Constants/Constants';
import { ListingInfo, ListingBody } from "@frontend/Types/ListingTypes";
import { ListingInteractionMethod } from "@frontend/Types/EnumTypes";

function getListingById(req: any, res: any, next: NextFunction) {
    const listingId = String(req.params.lid);
    const listing = LISTINGS.listings.find(l => {
        return l.listingId === listingId;
    })

    if (!listing) {
        const error: any = new Error('Listing not found');
        error.code = 404;
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

export { getListingById, createListing }; 