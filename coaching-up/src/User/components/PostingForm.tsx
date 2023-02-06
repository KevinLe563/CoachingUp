import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import './PostingForm.css';
import { UserInfo } from "../../Types/UserTypes";
import { CoachInfo } from "../../Types/CoachTypes";
import { Container, FormControl } from "react-bootstrap";
import { ListingTags } from "../../Types/EnumTypes";

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
        (Object.keys(ListingTags) as Array<keyof typeof ListingTags>).map((key) => {
            return (
                <option>
                    {key}
                </option>
            )
        })
    );
}

function PostingForm(props: CoachInfo) {
    return (
        <>
            <Container className="form-container border">
                <Form className="form">
                    <h1>New Posting</h1>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                                <Form.Label>Coach First Name</Form.Label>
                                <Form.Control placeholder={`${props.coachFirstName}`} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Coach Last Name</Form.Label>
                                <Form.Control placeholder={`${props.coachLastName}`} disabled />
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
                                <Form.Control as="select">
                                    <>
                                        {GenerateMethodOptions()}
                                    </>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export { PostingForm };