import React from "react";
import { useParams } from 'react-router-dom';
import { listings, coach } from "../../Testing/Constants/Constants";
import { Listing } from "../../Types/ListingTypes";
import { PostingForm, PostingFormProps } from "../components/PostingForm";

function UpdatePosting() {
    const listingId : string | undefined = useParams().listingId;
    const identifiedListing : (Listing | undefined) = listings.find(listing => listing.listingId === listingId);
    if (!identifiedListing) {
        return <h2>404 Not Found</h2>
    }

    const postingFormProps : PostingFormProps = {coachInfo: coach, listingInfo: identifiedListing}
    
    return (
        <PostingForm {...postingFormProps} />
    )
}

export default UpdatePosting;