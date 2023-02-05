import React from "react";

import { PostingForm } from "../components/PostingForm";
import { CoachInfo } from "../../Types/CoachTypes";

/* 
Only coaches can create new postings
*/

// TODO: fetch from backend
const coachInfo : CoachInfo = {coachFirstName: "john", coachLastName: "wick"};

function NewPosting() {

    return (
        <>
            <PostingForm {...coachInfo} />
        </>
    );
}

export { NewPosting };