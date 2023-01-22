import { UserInfo } from './UserTypes';
import { Title, Description } from './StringTypes';
import { ListingTags } from './EnumTypes';

interface AllListings {
    user: UserInfo
    listings: ListingInfo[]
}

interface ListingBody {
    title: String,
    description: String,
    tags: ListingTags[],
}

interface ListingInfo {
    listing_id: Number,
    listingBody: ListingBody,
}

export type { AllListings, ListingInfo, ListingBody };