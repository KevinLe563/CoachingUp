import React, { useEffect, useState, useContext } from "react";

import { getUserByIdUrl } from "../../Shared/Constants/APIPaths";
import { UserProfileCard } from "../../Shared/components/UIComponents/Cards/UserCard";
import { User } from "../../Types/UserTypes";
import { ErrorModal } from "../../Shared/components/UIComponents/Modal";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { AuthContext } from "../../Shared/context/AuthContext";

function UserProfile() {
    const { sendRequest, error, errorHandler } = useHttpClient();
    const auth = useContext(AuthContext);

    const [loadedUser, setLoadedUser] = useState<User>();
    // include sendRequest as a dependency since sendRequest is used in useEffect but is defined outside so it must rerender when sendRequest is changed
    useEffect(() => {
        const fetchUser = async () => {
            const url = `${getUserByIdUrl}/${auth.userId}`;
            try {
                const responseData = await sendRequest(
                    url
                );
                
                setLoadedUser(responseData.user);
            } catch(err) {
                console.log(err);
            }
        }

        fetchUser();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal 
                show={!!error}
                header={"An Error occurred."}
                description={error!}
                onHide={errorHandler}
            />
            {loadedUser && <UserProfileCard {...loadedUser} />}
        </>
    );
}

export default UserProfile;