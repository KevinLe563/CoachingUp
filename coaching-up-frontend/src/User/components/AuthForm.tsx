import React, { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import './Form.css';
import './AuthForm.css';
import { UserInfo } from "../../Types/UserTypes";
import { CoachInfo } from "../../Types/CoachTypes";
import { Container, FormControl } from "react-bootstrap";
import { ListingInteractionMethod } from "../../Types/EnumTypes";
import { Listing } from "../../Types/ListingTypes";
import { constants } from "buffer";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { AuthContext } from "../../Shared/context/AuthContext";


const loginModeSwitchString = 'Don\'t have an account? Sign up';
const signupModeSwitchString = 'Already have an account? Login';
const loginHeader = 'Login';
const signupHeader = 'Signup';

interface AuthProps {
    isLoginMode: boolean,
}

function AuthForm(props : AuthProps) {
    const [isLoginMode, setIsLoginMode] = useState(props.isLoginMode);
    const switchAuthMode = () => {
        setIsLoginMode(prevMode => !prevMode);
    };

    const [values, setValues] = useState({});
    const onFormChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({values, [name]: value});
        console.log(name, value);
    }

    const auth = useContext(AuthContext);
    const authSubmitHandler = (event : React.FormEvent) => {
        // fetch('http://localhost:5000/api/users/signup',
        // {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         values,

        //     })
        // });

        console.log(values);

        auth.login();
      };


    // TODO: add form validations
    return (
        <>
            <Container className="form-container border">
                <Form className="form" onSubmit={authSubmitHandler}>
                    <h1>{isLoginMode ? loginHeader : signupHeader}</h1>

                    <Form.Group className="form-group">
                        {!isLoginMode &&
                            <>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required name="fname" onChange={onFormChange} />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required name="lname" />
                            </>
                        }


                        <Form.Label>Username</Form.Label>
                        <Form.Control required />
                        {!isLoginMode &&
                            <>
                            <Form.Label>Email</Form.Label>
                            <Form.Control required name="email" />
                            </>
                        }
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" />
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

export { AuthForm };