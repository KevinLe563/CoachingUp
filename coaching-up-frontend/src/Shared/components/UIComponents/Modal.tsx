import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Listing } from "../../../Types/ListingTypes";

interface ModalProps {
    show: boolean,
    header: string,
    title?: string,
    description: string,
    alternateOption?: JSX.Element,
    onHide: () => void,
}

function CustomModal(props: (ModalProps & Listing)) {
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

function DetailsModal(props: Listing) {
    const [modalShow, setModalShow] = React.useState(false);
    const detailsHeading = "Details"
    const detailTitle = props.listingBody.title
    const detailDescription = props.listingBody.description
    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                View Details
            </Button>

            <CustomModal
                {...props}
                show={modalShow}
                onHide={() => setModalShow(false)}
                header={detailsHeading}
                title={detailTitle}
                description={detailDescription}    
            />
        </>
    )
}

function DeletionModal(props: Listing) {
    const [modalShow, setModalShow] = React.useState(false);
    const detailsHeading = "Are you sure?";
    const detailDescription = "Do you want to proceed? Please note that this action can't be undone.";
    const deleteButton = <Button variant="danger">Delete</Button>;
    return (
        <>
            <Button variant="danger" onClick={() => setModalShow(true)}>
                Delete
            </Button>

            <CustomModal
                {...props}
                show={modalShow}
                onHide={() => setModalShow(false)}
                header={detailsHeading}
                description={detailDescription}    
                alternateOption={deleteButton}
            />
        </>
    )
}

export { DetailsModal, DeletionModal };