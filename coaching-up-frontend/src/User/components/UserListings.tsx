import React, { useContext, useEffect, useState } from 'react';

import { UserListing } from './UserListing';
import './UserListings.css';

import { Listing } from '../../Types/ListingTypes';
import { userInfo } from 'os';
import { listings, user1 } from '../../Testing/Constants/Constants';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/AuthContext';
import { getListingsByUserIdUrl } from '../../Shared/Constants/APIPaths';
import { ErrorModal } from '../../Shared/components/UIComponents/Modal';

function UserListings(props : Listing[]) {
    const { sendRequest, error, errorHandler } = useHttpClient();
    const [loadedListings, setLoadedListings] = useState<Listing[]>([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // TODO: put userId in the body or data for security
                const url = `${getListingsByUserIdUrl}/${auth.userId}`;
                console.log(url);
                const responseData = await sendRequest(url);
                console.log(responseData.listings)
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
    console.log(loadedListings);
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

export { UserListings };