import React, { useEffect, useState, useContext } from "react";

import { UserProfileCard } from "../../Shared/components/UIComponents/Cards/UserCard";
import { User } from "../../Types/UserTypes";
import { ErrorModal } from "../../Shared/components/UIComponents/Modal";
import { LoadingContext } from "../../Shared/context/LoadingContext";
import { useHttpClient } from "../../Shared/hooks/http-hook";

function UserProfile() {
    const { sendRequest, error, errorHandler } = useHttpClient();
    const [loadedUser, setLoadedUser] = useState<User>();
    // include sendRequest as a dependency since sendRequest is used in useEffect but is defined outside so it must rerender when sendRequest is changed
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/user/6429f457ee43b2ed356c2a92');
                
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