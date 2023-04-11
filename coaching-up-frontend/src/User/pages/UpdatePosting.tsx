import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';

import { readUpdateDeleteListingByIdUrl } from "../../Shared/Constants/APIPaths";
import { PostingFormProps } from "../../Types/FormTypes";
import { Listing } from "../../Types/ListingTypes";
import { PostingForm } from "../components/PostingForm";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { AuthContext } from "../../Shared/context/AuthContext";
import { ErrorModal } from "../../Shared/components/UIComponents/Modal";

function UpdatePosting() {
    const listingId : string | undefined = useParams().listingId;
    const { sendRequest, error, errorHandler } = useHttpClient();
    const [loadedListing, setLoadedListing] = useState<Listing>();

    const auth = useContext(AuthContext);

    let postingFormProps : PostingFormProps = {
        userId: auth.userId!
    }

    useEffect(() => {
        /* cannot add loadedListing as dependancy since it causes infinite looping */
        const fetchListing = async () => {
            try {
                const url = `${readUpdateDeleteListingByIdUrl}/${listingId}`;
                const responseData = await sendRequest(url);
                setLoadedListing(responseData.listing);
            } catch(err) {
                console.log(err);
            }
        };
        fetchListing();
    }, [sendRequest, listingId]);

    postingFormProps.listing = loadedListing;
    return (
        <>
            <ErrorModal 
                show={!!error}
                header={"An Error occurred."}
                description={error!}
                onHide={errorHandler}
            />
            {postingFormProps.listing && <PostingForm {...postingFormProps} />}
        </>
    );
}

export default UpdatePosting;