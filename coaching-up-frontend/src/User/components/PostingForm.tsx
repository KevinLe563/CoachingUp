import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import LoadingOverlay from 'react-loading-overlay-ts';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../../Shared/styles/Form.css';
import { Listing } from "../../Types/ListingTypes";
import { createListingUrl, readUpdateDeleteListingByIdUrl } from "../../Shared/Constants/APIPaths";
import { PostingFormProps } from "../../Types/FormTypes";
import { FormProps } from "../../Types/FormTypes";
import { Container } from "react-bootstrap";
import { ListingInteractionMethod, PriceIntervals } from "../../Types/EnumTypes";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { ErrorModal } from "../../Shared/components/UIComponents/Modal";

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

function GeneratePriceIntervalOptions() {
    return (
        (Object.keys(PriceIntervals) as Array<keyof typeof PriceIntervals>).map((key) => {
            return (
                <option>
                    {PriceIntervals[key]}
                </option>
            )
        })
    );
}

function listingToFormProps(listing? : Listing) {
    const formData : FormProps = {};
    if (listing) {
        formData["title"] = listing.title;
        formData["description"] = listing.description;
        formData["interactionMethod"] = listing.interactionMethod;
        formData["price"] = listing.priceInfo.price.toString();
        formData["priceInterval"] = listing.priceInfo.interval;
    }

    return formData;
}

function PostingForm(props: PostingFormProps) {
    const navigate = useNavigate();

    const formData : FormProps = listingToFormProps(props.listing);
    const [values, setValues] = useState(formData);
    const onFormChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        values[name] = value;
        setValues(values);
        // console.log(name, value);
    }

    const { sendRequest, error, errorHandler } = useHttpClient();

    const postingSubmitHandler = async (event : React.FormEvent) => {
        event.preventDefault();
        try {
            // TODO: FIGURE OUT HOW TO REMOVE THE SCROLL TO BOTTOM THING
            let url;
            let operation;
            if (props.listing) {
                url = `${readUpdateDeleteListingByIdUrl}/${props.listing.id.toString()}`;
                operation = 'PATCH';
            } else {
                url = createListingUrl;
                operation = 'POST';
            }


            await sendRequest(
                url, 
                operation,
                {
                    'Content-Type': 'application/json'
                }, 
                JSON.stringify(
                    {
                        title: values["title"],
                        description: values["description"],
                        interactionMethod: values["interactionMethod"],
                        price: values["price"],
                        priceInterval: values["priceInterval"],
                        userId: props.userId
                    }
                )    
            )
            navigate('/user/listings')
        } catch(err) {
            console.log(err);
            // console.log(values);
        }
      };

    return (
        <>
        <ErrorModal 
            show={!!error}
            header={"An Error occurred."}
            description={error!}
            onHide={errorHandler}
        />
        {/* <LoadingOverlay className="loading-overlay" active={loading.isLoading} spinner text="Creating new posting..."> */}
            <Container className="form-container border">
                <Form className="form" onSubmit={postingSubmitHandler}>
                    <h1>New Posting</h1>

                    <Form.Group className="form-group">
                        {/* <Row>
                            <Col>
                                <Form.Label>Coach First Name</Form.Label>
                                <Form.Control placeholder={`${coachInfo.coachFirstName}`} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Coach Last Name</Form.Label>
                                <Form.Control placeholder={`${coachInfo.coachLastName}`} disabled />
                            </Col>
                        </Row> */}
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control 
                                required
                                name="title"
                                onChange={onFormChange}
                                defaultValue={props.listing ? props.listing.title : ""}
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control
                                    required
                                    name="description"
                                    onChange={onFormChange}
                                    as="textarea" 
                                    aria-label="Description"
                                    defaultValue={props.listing ? props.listing.description : ""}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                                <Form.Label>Upload Listing Photo</Form.Label>
                                <Form.Control 
                                    type="file"
                                    name="file"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={onFormChange}
                                    // defaultValue={props.listing ? props.listing.ima}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Row>
                            <Col>
                                <Form.Label>
                                    Price
                                </Form.Label>
                                <Form.Control
                                    required
                                    name="price"
                                    type="number"
                                    min={0}
                                    onChange={onFormChange}
                                    defaultValue={props.listing ? props.listing.priceInfo.price.toString() : ""}
                                />
                            </Col>

                            <Col>
                                <Form.Label>
                                    Time Interval for Price
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-select"
                                    required
                                    name="priceInterval"
                                    onChange={onFormChange}
                                    defaultValue={props.listing ? props.listing.priceInfo.interval : ""}
                                >
                                    <>
                                        <option></option>
                                        {GeneratePriceIntervalOptions()}
                                    </>
                                </Form.Control>
                            
                            </Col>

                            <Col>
                                <Form.Label>
                                    Interaction Method
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-select"
                                    required
                                    name="interactionMethod"
                                    onChange={onFormChange}
                                    defaultValue={props.listing ? props.listing.interactionMethod : ""}
                                >
                                    <>
                                        <option></option>
                                        {GenerateMethodOptions()}
                                    </>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <button type="submit" className="btn btn-primary">{props.listing ? "Submit" : "Create"}</button>
                    </Form.Group>
                </Form>
            </Container>
        {/* </LoadingOverlay> */}
        </>
    );
}

export { PostingForm };