import React from "react";
import { AuthForm } from "../components/AuthForm";

function Auth() {
    // Logic to figure oouot if the user is logged in
    const props = {isLoginMode: false}

    return (
        <AuthForm {...props}/>
    );
}

export default Auth;