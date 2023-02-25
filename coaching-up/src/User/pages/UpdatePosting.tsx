import React from "react";
import { useParams } from 'react-router-dom';
import { LISTINGS, coach } from "../../Testing/Constants/Constants";
import { ListingInfo } from "../../Types/ListingTypes";
import { PostingForm, PostingFormProps } from "../components/PostingForm";

function UpdatePosting() {
    const listingId : Number = Number(useParams().listingId);
    const identifiedListing : (ListingInfo | undefined) = LISTINGS.listings.find(listing => listing.listing_id === listingId);
    if (!identifiedListing) {
        return <h2>404 Not Found</h2>
    }

    const postingFormProps : PostingFormProps = {coachInfo: coach, listingInfo: identifiedListing}
    
    return (
        <PostingForm {...postingFormProps} />
    )
}

export default UpdatePosting;