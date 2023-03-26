import { UserInfo } from './UserTypes';
import { CoachInfo } from './CoachTypes';
import { Title, Description } from './StringTypes';
import { ListingInteractionMethod } from './EnumTypes';
import { PriceInfo } from './PriceTypes';

interface Listing {
    listingId: string,
    creationDate: Date,
    title: string,
    description: string,
    coachId: string,
    interactionMethod: ListingInteractionMethod
    priceInfo: PriceInfo,
    userId: string,
}

export type { Listing };