import { AccountType } from "./EnumTypes"

interface UserInfo {
    userId: string,
    username: string,
    userType: AccountType,
}

export type { UserInfo };