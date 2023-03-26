import mongoose from 'mongoose';

import { ListingInteractionMethod, TimeIntervals } from "@frontend/Types/EnumTypes";
import { Listing } from '@frontend/Types/ListingTypes';

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    creationDate: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    coachId: { type: String, required: true },
    interactionMethod: { type: ListingInteractionMethod, required: true },
    price: {
        price: { type: Number, required: true },
        interval: { type: TimeIntervals, required: true }
    },
    userId: { type: String, required: true}
});

const ListingModel = mongoose.model<Listing>('ListingModel', listingSchema);
export default ListingModel;