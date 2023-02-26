import React, { useState } from "react";
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
import { UserInfo } from "../../Types/UserTypes";
import { CoachInfo } from "../../Types/CoachTypes";
import { Container, FormControl } from "react-bootstrap";
import { ListingInteractionMethod } from "../../Types/EnumTypes";
import { ListingInfo } from "../../Types/ListingTypes";
import { constants } from "buffer";
import CardHeader from "react-bootstrap/esm/CardHeader";

const loginModeSwitchString = 'Don\'t have an account? Sign up';
const signupModeSwitchString = 'Already have an account? Login';

function AuthForm() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const switchAuthMode = () => {
        setIsLoginMode(prevMode => !prevMode);
    };

    // add form validations
    return (
        <>
            <Container className="form-container border">
                <Form className="form">
                    <h1>Login Required</h1>

                    <Form.Group className="form-group">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required />
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required />
                        <Form.Label>Username</Form.Label>
                        <Form.Control required />
                        <Form.Label>Email</Form.Label>
                        <Form.Control required />
                        <Form.Label>Password</Form.Label>
                        <Form.Control required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <button type="submit" className="btn btn-primary">{isLoginMode ? 'Login' : 'Signup'}</button>
                    </Form.Group>
                    <a href="#" onClick={switchAuthMode}>{isLoginMode ? loginModeSwitchString : signupModeSwitchString}</a>
                </Form>
            </Container>
        </>
    );
}

export { AuthForm };