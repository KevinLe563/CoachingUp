import React from "react";
import { useLocation } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import './Form.css';
import { User } from "../../Types/UserTypes";
import { CoachInfo } from "../../Types/CoachTypes";
import { Container, FormControl } from "react-bootstrap";
import { ListingInteractionMethod } from "../../Types/EnumTypes";
import { Listing } from "../../Types/ListingTypes";
import { constants } from "buffer";

interface PostingFormProps  {
    coachInfo: CoachInfo;
    listingInfo?: Listing;
}

const schema = Yup.object().shape({
    title: Yup.string().required(),
    coachFirstName: Yup.string().required(),
    coachLastName: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    terms: Yup.bool().required().oneOf([true], "Terms must be accepted"),
});

function GenerateMethodOptions() {
    return (
        (Object.keys(ListingInteractionMethod) as Array<keyof typeof ListingInteractionMethod>).map((key) => {
            return (
                <option>
                    {ListingInteractionMethod[key]}
                </option>
            )
        })
    );
}

function GenerateButtonValue() {
    const location = useLocation();
    const path = location.pathname.toString().split('/');
    const func = path[path.length-1];
    if (func === "edit") {
        return "Edit";
    } else {
        return "Create";
    }
}

function PostingForm(props: PostingFormProps) {
    const coachInfo : CoachInfo = props.coachInfo;
    const listingInfo : Listing | undefined = props.listingInfo;
    // console.log(listingInfo);
    return (
        <>
            <Container className="form-container border">
                <Form className="form">
                    <h1>New Posting</h1>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                                <Form.Label>Coach First Name</Form.Label>
                                <Form.Control placeholder={`${coachInfo.coachFirstName}`} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Coach Last Name</Form.Label>
                                <Form.Control placeholder={`${coachInfo.coachLastName}`} disabled />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control 
                                required
                                defaultValue={listingInfo ? listingInfo.title : ""}
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    aria-label="Description"
                                    required
                                    defaultValue={listingInfo ? listingInfo.description : ""}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                                <Form.Label>Upload Photo</Form.Label>
                                <Form.Control 
                                    type="file"
                                    name="file"
                                    // defaultValue={image?}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                                <Form.Label>
                                    Method
                                </Form.Label>
                                <Form.Select defaultValue={listingInfo ? listingInfo.interactionMethod : ListingInteractionMethod.ONLINE}>
                                    <>
                                        {GenerateMethodOptions()}
                                    </>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <button type="submit" className="btn btn-primary">{GenerateButtonValue()}</button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export type { PostingFormProps };
export { PostingForm };