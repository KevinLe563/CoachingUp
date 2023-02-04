import { AccountType } from "./EnumTypes"

interface UserInfo {
    userId: Number,
    userName: String,
    userType: AccountType,
}

export type { UserInfo };