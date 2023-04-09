import React, { useEffect, useState, useContext } from "react";

import { UserProfileCard } from "../../Shared/components/UIComponents/Card";
import { User } from "../../Types/UserTypes";
import { ErrorModal } from "../../Shared/components/UIComponents/Modal";
import { LoadingContext } from "../../Shared/context/LoadingContext";

function UserProfile() {
    const [error, setError] = useState<string>();
    const [loadedUser, setLoadedUser] = useState<User>();
    const loading = useContext(LoadingContext);

    useEffect(() => {
        const sendRequest = async () => {
            try {
                loading.setLoading();
                const response = await fetch('http://localhost:5000/api/user/6429f457ee43b2ed356c2a92');
    
                const responseData = await response.json();
    
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUser(responseData.user);
                loading.setNotLoading();
            } catch(err) {
                loading.setNotLoading();
                setError((err as Error).message || 'Something went wrong. Please try again.');
            }
        }
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(undefined);
    }

    return (
        <>
            <ErrorModal 
                show={!!error}
                header={"An Error occurred."}
                description={error!}
                onHide={errorHandler}
            />
            {!loading.isLoading && loadedUser && <UserProfileCard {...loadedUser} />}
        </>
    );
}

export default UserProfile;