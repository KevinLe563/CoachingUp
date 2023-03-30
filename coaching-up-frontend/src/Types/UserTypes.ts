import { AccountType } from "./EnumTypes"

interface User {
    userId: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    accountType: AccountType,
}

export type { User};