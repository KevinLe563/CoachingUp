import React from 'react';
import { Link } from 'react-router-dom';

import './UserListings.css';
import { ListingInfo } from '../../Types/ListingTypes'
import { ListingCard } from '../../Shared/components/UIComponents/Card';

function UserListing(props: ListingInfo) {
    return (
        <ListingCard {...props} />
    )
}

export { UserListing };
export type { ListingInfo };