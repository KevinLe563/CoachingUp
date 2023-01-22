import React from 'react';

import './UserListings.css';
import { ListingInfo } from '../../Types/ListingTypes'

function UserListing(props: ListingInfo) {
    return (
        <li>
            <div>
                <h2>
                    {props.listingBody.title}
                </h2>
                <p>
                    {props.listingBody.description}
                </p>
                <div>
                    {props.listingBody.methods}
                </div>
                <div>{props.listingBody.roles}</div>
            </div>
        </li>
    )
}

export { UserListing };
export type { ListingInfo };