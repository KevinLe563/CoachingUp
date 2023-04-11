import React, { useContext, useEffect, useState } from 'react';

import './UserListings.css';
import { DeleteProps } from '../../Types/FormTypes';
import { UserListing } from '../components/UserListing';
import { Listing } from '../../Types/ListingTypes';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/AuthContext';
import { LoadingContext } from '../../Shared/context/LoadingContext';
import { getListingsByUserIdUrl } from '../../Shared/Constants/APIPaths';
import { ErrorModal } from '../../Shared/components/UIComponents/Modal';

export function UserListings() {
    const { sendRequest, error, errorHandler } = useHttpClient();
    const [loadedListings, setLoadedListings] = useState<Listing[]>([]);
    const auth = useContext(AuthContext);
    const loading = useContext(LoadingContext);

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

    // if (!loading.isLoading && loadedListings && loadedListings.length === 0) {
    //     return (
    //         <h2>
    //             You currently have no open listings. Click <a>here</a> to create some!
    //         </h2>
    //     )
    // }

    const onDeleteHandler = (lid : string) => {
        setLoadedListings(loadedListings.filter(listing => listing.id.toString() !== lid));
    }

    const onDelete : DeleteProps = {
        onDelete: onDeleteHandler
    }

    return (
        <>
            <ErrorModal 
                show={!!error}
                header={"An Error occurred."}
                description={error!}
                onHide={errorHandler}
            />
            {!loading.isLoading && loadedListings && loadedListings.map(listing => {
                const props = {...listing, ...onDelete};
                return (
                    <UserListing {...props} key={listing.id.toString()} />
                )
            })}
        </>
    )
}
