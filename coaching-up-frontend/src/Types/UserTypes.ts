import { AccountType } from "./EnumTypes"

interface UserInfo {
    userId: string,
    username: string,
    userEmail: string,
    userPassword: string,
    userType: AccountType,
}

export type { UserInfo };