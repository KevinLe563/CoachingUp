import { AccountType } from "./EnumTypes"

interface UserInfo {
    userId: string,
    userName: string,
    userType: AccountType,
}

export type { UserInfo };