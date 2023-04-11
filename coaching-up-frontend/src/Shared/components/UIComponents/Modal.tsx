import React from "react";
import { useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { DeleteProps } from "../../../Types/FormTypes";
import { readUpdateDeleteListingByIdUrl } from "../../Constants/APIPaths";
import { useHttpClient } from "../../hooks/http-hook";
import { Listing } from "../../../Types/ListingTypes";

interface ModalProps {
    show: boolean,
    header: string,
    title?: string,
    description: string,
    alternateOption?: JSX.Element,
    onHide: () => void,
}

function CustomModal(props: ModalProps) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.title && <h4>{props.title}</h4>}
                <p>
                    {props.description}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <>
                    <Button onClick={props.onHide}>Close</Button>
                    {props.alternateOption}
                </>
            </Modal.Footer>
        </Modal>
    );
}

export function DetailsModal(props: Listing) {
    const [modalShow, setModalShow] = React.useState(false);
    const detailsHeading = "Details"
    const detailTitle = props.title
    const detailDescription = props.description
    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                View Details
            </Button>

            <CustomModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header={detailsHeading}
                title={detailTitle}
                description={detailDescription}    
            />
        </>
    )
}

export function DeletionModal(props: Listing & DeleteProps) {
    const [modalShow, setModalShow] = React.useState(false);
    const { sendRequest, error, errorHandler } = useHttpClient();
    const navigate = useNavigate()

    const deleteSubmitHandler = async () => {
        setModalShow(false);
        const url = `${readUpdateDeleteListingByIdUrl}/${props.id}`;
        try {
            await sendRequest(
                url,
                'DELETE'
            );
            props.onDelete(props.id.toString());
        } catch(err) {
            console.log(err);
        }
        navigate('/user/listings');
    }

    const detailsHeading = "Are you sure?";
    const detailDescription = "Do you want to proceed? Please note that this action can't be undone.";
    const deleteButton = <Button variant="danger" onClick={deleteSubmitHandler} >Delete</Button>;
    
    return (
        <>
            <ErrorModal 
                show={!!error}
                header={"An Error occurred."}
                description={error!}
                onHide={errorHandler}
            />
            <Button variant="danger" onClick={() => setModalShow(true)}>
                Delete
            </Button>
            <CustomModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header={detailsHeading}
                description={detailDescription}    
                alternateOption={deleteButton}
            />
        </>
    )
}

export function ErrorModal(props: ModalProps) {
    const detailsHeading = "An Error Occurred";
    const detailDescription = "An error occurred. Please try again.";
    const deleteButton = <Button variant="danger">Close</Button>;
    return (
        <>
            <CustomModal
                {...props}
            />
        </>
    )
}
