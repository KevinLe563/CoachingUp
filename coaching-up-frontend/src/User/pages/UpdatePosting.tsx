import React from "react";
import { useParams } from 'react-router-dom';
import { Listing } from "../../Types/ListingTypes";
import { PostingForm } from "../components/PostingForm";

function UpdatePosting() {
    const listingId : string | undefined = useParams().listingId;
    
    return (
        <h2></h2>
    )
}

export default UpdatePosting;