import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import './Card.css';
import logo from '../dumbbell.jpg';
import { DeleteProps } from '../../../../Types/FormTypes';
import { Listing } from '../../../../Types/ListingTypes';
import { DetailsModal, DeletionModal } from '../Modal';

function createTags(props: Listing) {
    const tags : string[] = [];
    tags.push(props.interactionMethod);
    return tags;
}

// TODO: Make card titles etc. a prop so we can use for 3 different things: applications received(coach), applications submitted(client), Postings created(coach)
// TODO: make userinfo come from global context
// TODO: make listings deactivatble and reactivatable
export function ListingCard(props: Listing & DeleteProps ) {
    const isClient : boolean = true;
    // const isCoach : boolean = props.accountType === AccountType.COACH;
    // TODO: Append all enum tags into a string array to be mapped (make a function or something)
    const tags = createTags(props);

    return (
        <Card>
            <Card.Header>
                <Table bordered={false}>
                    {/* <tbody className="table-wrapper"> */}
                        <tr>
                            <th>
                                {isClient ? "SUBMITTED AT" : "POSTING CREATED"}
                            </th>
                            <th>
                                PRICE
                            </th>
                            <th>
                                <>LISTING# {props.id}</>
                            </th>
                        </tr>

                        <tr>
                            <td>
                                {props.creationDate.toString()}    
                            </td>
                            <td>
                                <>${props.priceInfo.price}/{props.priceInfo.interval}</>
                            </td>
                            <td className="">
                                {/* TODO: move this to the right, make first 2 columns narrower */}
                                {/* Preview: previews what the coach/client will see when they open this lsiting */}
                                
                            </td>
                        </tr>
                    {/* </tbody> */}
                </Table>
            </Card.Header>
            <Row>
                <Card.Body>
                    <>
                    <Container>
                    <Row className="align-items-center">
                    <Col sm={2}>
                        <Card.Img alt="listing image" src={logo}/>
                    </Col>
                    <Col sm={8}>
                        <Link to={`/${props.userId}/listings/${props.id}/edit`}>
                            <Card.Title>
                                {props.title}
                            </Card.Title>
                        </Link>
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                        {/* TODO: Check if tags is empty */}
                        {tags.map(tag => {
                            return (
                                <Badge pill bg="info">
                                    {tag}
                                </Badge>
                            )
                            })}
                        
                    </Col>
                    <Col sm={2}>
                    <div className="button-container">
                        <Link to={`/${props.userId}/listings/${props.id}/edit`}>
                            <Button>Edit {isClient ? "Application" : "Posting"}</Button>
                        </Link>
                        
                        {/* {props.coach.coachInstagram &&
                        <Button>Instagram</Button>}

                        {props.listingBody.coach.coachWebsite &&
                        <Button>Website</Button>} */}

                        <DetailsModal {...props} />
                        
                        <DeletionModal {...props} />
                    </div>
                    </Col>
                    </Row>
                    </Container>
                    </>
                </Card.Body>
            </Row>
        </Card>
    )
}
