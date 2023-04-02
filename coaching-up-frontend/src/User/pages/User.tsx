import React from 'react';

import { UserListings } from '../components/UserListings';

import { User } from '../../Types/UserTypes';
import { Listing } from '../../Types/ListingTypes';
import { AccountType, ListingInteractionMethod, TimeIntervals } from '../../Types/EnumTypes';
import { CoachInfo } from '../../Types/CoachTypes';
import { PriceInfo } from '../../Types/PriceTypes';
import { listings } from '../../Testing/Constants/Constants';

function UserPage() {
    return (
        <div>
            {/* <h1>Welcome {user1.user_name} to your dashboard!</h1> */}
            <UserListings {...listings} />
        </div>
    )
}

export default UserPage;