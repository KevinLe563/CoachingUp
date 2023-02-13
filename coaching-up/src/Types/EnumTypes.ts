// TODO: Separate these into separate enums
enum ListingInteractionMethod {
    // Methods
    Online = 'Online',
    InPerson = 'In-Person',
    Hybrid = 'Hybrid',
}

enum AccountType {
    Coach = 'Coach',
    Client = 'Client',
}

enum TimeIntervals {
    Session = 'Session',
    Month = 'Month',
    Year = 'Year',
}

export { ListingInteractionMethod, TimeIntervals, AccountType };