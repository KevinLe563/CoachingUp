// TODO: Separate these into separate enums
enum ListingInteractionMethod {
    // Methods
    ONLINE = 'Online',
    IN_PERSON = 'In-Person',
    HYBRID = 'Hybrid',
}

enum AccountType {
    COACH = 'Coach',
    CLIENT = 'Client',
}

enum TimeIntervals {
    SESSION = 'Session',
    MONTH = 'Month',
    YEAR = 'Year',
}

export { ListingInteractionMethod, TimeIntervals, AccountType };