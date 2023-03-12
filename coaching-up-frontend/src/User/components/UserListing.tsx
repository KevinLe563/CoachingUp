import React from 'react';
import { Link } from 'react-router-dom';

import './UserListings.css';
import { Listing } from '../../Types/ListingTypes'
import { ListingCard } from '../../Shared/components/UIComponents/Card';
import { UserInfo } from '../../Types/UserTypes';

function UserListing(props: (Listing & UserInfo)) {
    return (
        <ListingCard {...props} />
    )
}

export { UserListing };