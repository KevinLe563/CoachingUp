import { UserInfo } from './UserTypes';
import { CoachInfo } from './CoachTypes';
import { Title, Description } from './StringTypes';
import { ListingInteractionMethod } from './EnumTypes';
import { PriceInfo } from './PriceTypes';

interface AllListings {
    user: UserInfo
    listings: ListingInfo[]
}

interface ListingBody {
    title: string,
    description: string,
    coach: CoachInfo,
    interactionMethod: ListingInteractionMethod
    price: PriceInfo,
}

interface ListingInfo {
    listingId: string,
    listingDate: Date,
    listingBody: ListingBody,
}

export type { AllListings, ListingInfo, ListingBody };