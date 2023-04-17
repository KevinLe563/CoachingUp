import React, { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay-ts';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Container, FormControl } from "react-bootstrap";

import './Auth.css';
import { loginUrl, signupUrl } from "../../Shared/Constants/APIPaths";
import { User } from "../../Types/UserTypes";
import { CoachInfo } from "../../Types/CoachTypes";
import { ListingInteractionMethod } from "../../Types/EnumTypes";
import { Listing } from "../../Types/ListingTypes";
import { constants } from "buffer";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { AuthContext } from "../../Shared/context/AuthContext";
import { LoadingContext } from "../../Shared/context/LoadingContext";
import { ErrorModal } from "../../Shared/components/UIComponents/Modal"; 
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { FormProps } from "../../Types/FormTypes";

const loginModeSwitchString = 'Don\'t have an account? Sign up';
const signupModeSwitchString = 'Already have an account? Login';
const loginHeader = 'Login';
const signupHeader = 'Signup';

export default function Auth() {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchAuthMode = () => {
        setIsLoginMode(prevMode => !prevMode);
    };

    const [formData, setValues] = useState(new FormData());
    const onFormChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        if (event.target.files) {
            const file = event.target.files[0];
            formData.set(name, file);
        } else {
            const value = event.target.value;
            formData.set(name, value);
        }
        setValues(formData);
    }

    const { sendRequest, error, errorHandler } = useHttpClient();
    
    const authSubmitHandler = async (event : React.FormEvent) => {
        event.preventDefault();
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    loginUrl, 
                    'POST', 
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        email: formData.get('email'),
                        password: formData.get('password')
                    })
                );
                auth.login(responseData.user.id);
            } catch(err) {
                console.log(err);
            }
        } else {
            try {
                const responseData = await sendRequest(
                    signupUrl, 
                    'POST',
                    {},
                    formData
                );
                auth.login(responseData.user.id);
            } catch(err) {
                console.log(err);
            }
        }
      };

    // TODO: add form validations
    return (
        <>
            <ErrorModal 
                show={!!error}
                header={"An Error occurred."}
                description={error!}
                onHide={errorHandler}
            />
            <Container className="form-container border">
                {/* {!isLoading && <LoadingSpinner />} */}
                    <Form className="form" onSubmit={authSubmitHandler}>
                        <h1>{isLoginMode ? loginHeader : signupHeader}</h1>

                        <Form.Group className="form-group">
                            {!isLoginMode &&
                                <>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required name="fname" onChange={onFormChange} />
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required name="lname" onChange={onFormChange} />
                                </>
                            }

                            <Form.Label>Email</Form.Label>
                            <Form.Control required name="email" onChange={onFormChange} />
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="password" onChange={onFormChange} />
                        
                            {!isLoginMode &&
                                <>
                                    <Form.Label>Upload Profile Photo</Form.Label>
                                    <Form.Control 
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={onFormChange}
                                        // defaultValue={props.listing ? props.listing.ima}
                                    />
                                </>
                            }
                        </Form.Group>
                        <Form.Group className="form-group">
                            <button type="submit" className="btn btn-primary">{isLoginMode ? 'Login' : 'Signup'}</button>
                        </Form.Group>
                        <a className="form-mode-switch" href="#" onClick={switchAuthMode}>{isLoginMode ? loginModeSwitchString : signupModeSwitchString}</a>
                    </Form>
            </Container>
        </>
    );
}