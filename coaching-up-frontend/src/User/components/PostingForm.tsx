import React, { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import LoadingOverlay from 'react-loading-overlay-ts';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import './Form.css';
import { User } from "../../Types/UserTypes";
import { FormProps } from "../../Types/FormTypes";
import { CoachInfo } from "../../Types/CoachTypes";
import { Container, FormControl } from "react-bootstrap";
import { ListingInteractionMethod, TimeIntervals } from "../../Types/EnumTypes";
import { Listing } from "../../Types/ListingTypes";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { AuthContext } from "../../Shared/context/AuthContext";
import { ErrorModal } from "../../Shared/components/UIComponents/Modal";

interface PostingFormProps  {
    coachInfo: CoachInfo;
    listingInfo?: Listing;
}

// const schema = Yup.object().shape({
//     title: Yup.string().required(),
//     coachFirstName: Yup.string().required(),
//     coachLastName: Yup.string().required(),
//     description: Yup.string().required(),
//     price: Yup.number().required(),
//     terms: Yup.bool().required().oneOf([true], "Terms must be accepted"),
// });

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
        (Object.keys(TimeIntervals) as Array<keyof typeof TimeIntervals>).map((key) => {
            return (
                <option>
                    {TimeIntervals[key]}
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

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const formData : FormProps = {};
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
            await sendRequest(
                'http://localhost:5000/api/listings', 
                'POST',
                {
                    'Content-Type': 'application/json'
                }, 
                JSON.stringify(
                    {
                        title: values["title"],
                        description: values["description"],
                        interactionMethod: values["interactionMethod"],
                        price: values["price"],
                        timeInterval: values["priceInterval"],
                        userId: auth.userId
                    }
                )    
            )
            navigate('/user/listings')
        } catch(err) {
            console.log(err);
        }
      };

    // console.log(listingInfo);
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
                                name="title"
                                onChange={onFormChange}
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
                                    required
                                    name="description"
                                    onChange={onFormChange}
                                    as="textarea" 
                                    aria-label="Description"
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
                                    Price
                                </Form.Label>
                                <Form.Control
                                    required
                                    name="price"
                                    type="number"
                                    min={0}
                                    onChange={onFormChange}
                                    // defaultValue={listingInfo ? listingInfo.description : ""}
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
                                >
                                    <>
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
                                    defaultValue={listingInfo ? listingInfo.interactionMethod : ListingInteractionMethod.ONLINE}
                                >
                                    <>
                                        {GenerateMethodOptions()}
                                    </>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <button type="submit" className="btn btn-primary">{GenerateButtonValue()}</button>
                    </Form.Group>
                </Form>
            </Container>
        {/* </LoadingOverlay> */}
        </>
    );
}

export type { PostingFormProps };
export { PostingForm };