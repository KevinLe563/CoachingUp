import mongoose from "mongoose";

import { User } from '@frontend/Types/UserTypes';
import ListingModel from "./listing";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: { type: String, required: true},
    lname: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    // image: { type: String, required: true },
    // change this to applications 
    listings: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Listing' }]
});

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;