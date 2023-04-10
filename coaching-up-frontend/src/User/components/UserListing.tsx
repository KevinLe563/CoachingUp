import React from 'react';
import { Link } from 'react-router-dom';

import './UserListing.css';
import { Listing } from '../../Types/ListingTypes'
import { ListingCard } from '../../Shared/components/UIComponents/Cards/ListingCard';
import { User } from '../../Types/UserTypes';

function UserListing(props: Listing) {
    return (
        <ListingCard {...props} />
    )
}

export { UserListing };