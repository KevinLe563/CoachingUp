import mongoose from 'mongoose';

import { ListingInteractionMethod, TimeIntervals } from "@frontend/Types/EnumTypes";

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    listingDate: { type: Date, required: true },
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

module.exports = mongoose.model('Listing', listingSchema);