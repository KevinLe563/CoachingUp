import { Listing } from "./ListingTypes"

export interface FormProps {
    [key:string]: string
}

export interface PostingFormProps {
    userId: string,
    listing?: Listing
}

export interface DeleteProps {
    onDelete: (id: string) => void
}