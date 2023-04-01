import mongoose from 'mongoose';

import { ListingInteractionMethod, TimeIntervals } from "@frontend/Types/EnumTypes";
import { Listing } from '@frontend/Types/ListingTypes';
import UserModel from './user';

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    creationDate: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    coachId: { type: String, required: true },
    interactionMethod: { type: String, enum: ListingInteractionMethod, required: true },
    priceInfo: {
        price: { type: Number, required: true },
        interval: { type: String, enum: TimeIntervals, required: true }
    },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

const ListingModel = mongoose.model<Listing>('Listing', listingSchema);
export default ListingModel;