import React from 'react';

import { UserListings } from '../components/UserListings';

import { UserInfo } from '../../Types/UserTypes';
import { AllListings, ListingBody, ListingInfo } from '../../Types/ListingTypes';
import { AccountType, ListingInteractionMethod, TimeIntervals } from '../../Types/EnumTypes';
import { CoachInfo } from '../../Types/CoachTypes';
import { PriceInfo } from '../../Types/PriceTypes';
import { LISTINGS } from '../../Testing/Constants/Constants';

function UserPage() {
    return (
        <div>
            {/* <h1>Welcome {user1.user_name} to your dashboard!</h1> */}
            <UserListings {...LISTINGS} />
        </div>
    )
}

export default UserPage;