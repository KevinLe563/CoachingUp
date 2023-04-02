import React from 'react';

import { UserListing } from './UserListing';
import './UserListings.css';

import { Listing } from '../../Types/ListingTypes';
import { userInfo } from 'os';
import { listings, user1 } from '../../Testing/Constants/Constants';

function UserListings(props : Listing[]) {
    const userListings : Listing[] = Object.values(props).filter(l => l.userId.toString() === user1.userId);
    if (userListings.length === 0) {
        return (
            <h2>
                You currently have no open listings. Click <a>here</a> to create some!
            </h2>
        )
    }
    return (
        <>
            {userListings.map(listing => (
                <UserListing {...listing} {...user1} />
            ))}
        </>
    )
}

export { UserListings };