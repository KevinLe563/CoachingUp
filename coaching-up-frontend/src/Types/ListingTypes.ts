import { UserInfo } from './UserTypes';
import { CoachInfo } from './CoachTypes';
import { Title, Description } from './StringTypes';
import { ListingInteractionMethod } from './EnumTypes';
import { PriceInfo } from './PriceTypes';

interface Listing {
    listingId: string,
    listingDate: Date,
    title: string,
    description: string,
    coachId: string,
    interactionMethod: ListingInteractionMethod
    price: PriceInfo,
    userId: string,
}

export type { Listing };