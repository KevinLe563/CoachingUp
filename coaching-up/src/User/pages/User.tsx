import React from 'react';

import { ListingInfo } from '../components/UserListing';
import { UserListings } from '../components/UserListings';

import { UserInfo } from '../../Types/UserTypes';
import { AllListings, ListingBody } from '../../Types/ListingTypes';
import { ListingTags } from '../../Types/EnumTypes';

function UserPage() {
    const user1 : UserInfo  = {user_id: 1, user_name: "Max"};
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis volutpat nulla, vitae cursus felis tincidunt in. Suspendisse sed sapien et sem hendrerit porttitor. Cras maximus, velit sit amet vestibulum malesuada, libero massa vestibulum urna, condimentum commodo lacus nibh non lacus. Maecenas tempus suscipit turpis, in varius est fringilla vitae. In vel pretium nisl. Duis sodales tellus id magna dignissim, sed pharetra sapien venenatis. In hac habitasse platea dictumst. Etiam sed tortor sagittis, pulvinar leo at, sollicitudin ante. Mauris bibendum non tortor sed egestas."
    const listingBody : ListingBody = {title: "title1", description: description, tags: [ListingTags.Client, ListingTags.InPerson]};
    const listingBody1 : ListingBody = {title: "title2", description: description, tags: [ListingTags.Hybrid]};
    const listing1 : ListingInfo = {listing_id: 3, listingBody: listingBody};
    const listing2 : ListingInfo = {listing_id: 4, listingBody: listingBody1};
    const LISTINGS : AllListings = {user: user1, listings: [listing1, listing2]}; 

    return (
        <div>
            <h1>Welcome {user1.user_name} to your dashboard!</h1>
            <UserListings {...LISTINGS} />
        </div>
    )
}

export default UserPage;