import React from 'react';
import { Link } from 'react-router-dom';

import './UserListings.css';
import { Listing } from '../../Types/ListingTypes'
import { ListingCard } from '../../Shared/components/UIComponents/Card';
import { User } from '../../Types/UserTypes';

function UserListing(props: (Listing & User)) {
    return (
        <ListingCard {...props} />
    )
}

export { UserListing };