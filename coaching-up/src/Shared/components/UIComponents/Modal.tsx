import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ListingInfo } from "../../../Types/ListingTypes";

interface ModalProps {
    show: boolean,
    onHide: () => void,
}

function CustomModal(props: (ModalProps & ListingInfo)) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
                {props.listingBody.description}
            </p>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function DetailsModal(props: ListingInfo) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                View Details
            </Button>

            <CustomModal
                {...props}
                show={modalShow}
                onHide={() => setModalShow(false)}    
            />
        </>
    )
}

export { DetailsModal };