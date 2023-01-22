import { UserInfo } from './UserTypes';
import { Title, Description } from './StringTypes';
import { Role, Method } from './EnumTypes';

interface AllListings {
    user: UserInfo
    listings: ListingInfo[]
}

interface ListingBody {
    title: String,
    description: String,
    roles: Role,
    methods: Method,
}

interface ListingInfo {
    listing_id: Number,
    listingBody: ListingBody,
}

export type { AllListings, ListingInfo, ListingBody };