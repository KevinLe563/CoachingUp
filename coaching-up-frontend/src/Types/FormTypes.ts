import { Listing } from "./ListingTypes"

export interface FormProps {
    [key:string]: string
}

export interface PostingFormProps {
    userId: string,
    Listing?: Listing
}