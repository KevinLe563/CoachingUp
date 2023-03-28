import { UserInfo } from '../../Types/UserTypes';
import { Listing } from '../../Types/ListingTypes';
import { AccountType, ListingInteractionMethod, TimeIntervals } from '../../Types/EnumTypes';
import { CoachInfo } from '../../Types/CoachTypes';
import { PriceInfo } from '../../Types/PriceTypes';

const user1 : UserInfo  = {userId: "1", username: "Max", userType: AccountType.CLIENT, userEmail: "test@gmail.com", userPassword: "password1"};
const users : UserInfo[] = [user1];
const coach : CoachInfo = {coachFirstName: "john", coachLastName: "wick"};
const priceInfo : PriceInfo = {price: 100.4, interval: TimeIntervals.SESSION};
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis volutpat nulla, vitae cursus felis tincidunt in. Suspendisse sed sapien et sem hendrerit porttitor. Cras maximus, velit sit amet vestibulum malesuada, libero massa vestibulum urna, condimentum commodo lacus nibh non lacus. Maecenas tempus suscipit turpis, in varius est fringilla vitae. In vel pretium nisl. Duis sodales tellus id magna dignissim, sed pharetra sapien venenatis. In hac habitasse platea dictumst. Etiam sed tortor sagittis, pulvinar leo at, sollicitudin ante. Mauris bibendum non tortor sed egestas."
const listing1 : Listing = {listingId: "3", creationDate: new Date(), title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis", description: description, interactionMethod: ListingInteractionMethod.IN_PERSON, coachId: "1", priceInfo: priceInfo, userId:"1" };
const listings = [listing1];

export { listings, coach, user1, priceInfo, users };