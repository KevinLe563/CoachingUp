import React, { useContext} from "react";

import { PostingForm } from "../components/PostingForm";
import { PostingFormProps } from "../../Types/FormTypes";
import { AuthContext } from "../../Shared/context/AuthContext";

/* 
Only coaches can create new postings
*/

function NewPosting() {
    const auth = useContext(AuthContext);

    const postingFormProps : PostingFormProps = {
        userId: auth.userId!
    }

    return (
        <>
            <PostingForm {...postingFormProps} />
        </>
    );
}

export default NewPosting;