import { Types } from 'mongoose';

import { AccountType } from "./EnumTypes"
import { Listing } from "./ListingTypes"

interface User {
    userId: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    accountType: AccountType,
    listings: Types.ObjectId[]
}

export type { User};