import { UserInfo } from './UserTypes';
import { CoachInfo } from './CoachTypes';
import { Title, Description } from './StringTypes';
import { ListingTags } from './EnumTypes';
import { PriceInfo } from './PriceTypes';

interface AllListings {
    user: UserInfo
    listings: ListingInfo[]
}

interface ListingBody {
    title: String,
    description: String,
    coach: CoachInfo,
    tags: String[],
    price: PriceInfo,
}

interface ListingInfo {
    listing_id: Number,
    listing_date: Date,
    listingBody: ListingBody,
}

export type { AllListings, ListingInfo, ListingBody };