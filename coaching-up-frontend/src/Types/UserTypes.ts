import { Types } from 'mongoose';

import { AccountType } from "./EnumTypes"

interface User {
    id: Types.ObjectId,
    fname: string,
    lname: string,
    email: string,
    password: string,
    accountType: AccountType,
    listings: Types.ObjectId[]
}

export type { User };