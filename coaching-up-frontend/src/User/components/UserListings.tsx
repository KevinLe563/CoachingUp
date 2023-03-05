import React from 'react';

import { UserListing } from './UserListing';
import './UserListings.css';

import { AllListings } from '../../Types/ListingTypes';
import { userInfo } from 'os';

function UserListings(props : AllListings) {
    if (props.listings.length === 0) {
        return (
            <h2>
                You currently have no open listings. Click <a>here</a> to create some!
            </h2>
        )
    }
    return (
        <>
            {props.listings.map(listing => (
                <UserListing {...listing} {...props.user} />
            ))}
        </>
    )
}

export { UserListings };