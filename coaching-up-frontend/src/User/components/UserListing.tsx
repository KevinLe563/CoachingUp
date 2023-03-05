import React from 'react';
import { Link } from 'react-router-dom';

import './UserListings.css';
import { ListingInfo } from '../../Types/ListingTypes'
import { ListingCard } from '../../Shared/components/UIComponents/Card';
import { UserInfo } from '../../Types/UserTypes';

function UserListing(props: (ListingInfo & UserInfo)) {
    return (
        <ListingCard {...props} />
    )
}

export { UserListing };