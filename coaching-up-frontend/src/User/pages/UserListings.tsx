import React, { useContext, useEffect, useState } from 'react';

import './UserListings.css';
import { UserListing } from '../components/UserListing';
import { Listing } from '../../Types/ListingTypes';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/AuthContext';
import { getListingsByUserIdUrl } from '../../Shared/Constants/APIPaths';
import { ErrorModal } from '../../Shared/components/UIComponents/Modal';

export function UserListings() {
    const { sendRequest, error, errorHandler } = useHttpClient();
    const [loadedListings, setLoadedListings] = useState<Listing[]>([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // TODO: put userId in the body or data for security
                const url = `${getListingsByUserIdUrl}/${auth.userId}`;
                const responseData = await sendRequest(url);
                setLoadedListings(responseData.listings);
            } catch(err) {
                console.log(err);
            }
        };

        fetchListings();
    }, [sendRequest, auth.userId]);

    if (loadedListings && loadedListings.length === 0) {
        return (
            <h2>
                You currently have no open listings. Click <a>here</a> to create some!
            </h2>
        )
    }
    return (
        <>
            <ErrorModal 
                show={!!error}
                header={"An Error occurred."}
                description={error!}
                onHide={errorHandler}
            />
            {loadedListings && loadedListings.map(listing => (
                <UserListing {...listing} />
            ))}
        </>
    )
}
