import { Types } from 'mongoose';

import { User } from './UserTypes';
import { CoachInfo } from './CoachTypes';
import { Title, Description } from './StringTypes';
import { ListingInteractionMethod } from './EnumTypes';
import { PriceInfo } from './PriceTypes';

interface Listing {
    id: Types.ObjectId,
    creationDate: Date,
    title: string,
    description: string,
    interactionMethod: ListingInteractionMethod
    priceInfo: PriceInfo,
    userId: Types.ObjectId,
}

export type { Listing };