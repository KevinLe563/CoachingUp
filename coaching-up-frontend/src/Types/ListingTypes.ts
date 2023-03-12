import { UserInfo } from './UserTypes';
import { CoachInfo } from './CoachTypes';
import { Title, Description } from './StringTypes';
import { ListingInteractionMethod } from './EnumTypes';
import { PriceInfo } from './PriceTypes';

interface ListingBody {
    title: string,
    description: string,
    coach: CoachInfo,
    interactionMethod: ListingInteractionMethod
    price: PriceInfo,
}

interface Listing {
    listingId: string,
    listingDate: Date,
    listingBody: ListingBody,
    userId: string,
}

export type { Listing, ListingBody };