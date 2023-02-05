import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { UserInfo } from "../../Types/UserTypes";
import { CoachInfo } from "../../Types/CoachTypes";

const schema = Yup.object().shape({
    title: Yup.string().required(),
    coachFirstName: Yup.string().required(),
    coachLastName: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    terms: Yup.bool().required().oneOf([true], "Terms must be accepted"),
});

function PostingForm(props: CoachInfo) {
    return (
        <>
        
        </>
    );
}

export { PostingForm };