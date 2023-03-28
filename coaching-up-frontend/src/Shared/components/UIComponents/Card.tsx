import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { Listing } from '../../../Types/ListingTypes';
import { DetailsModal, DeletionModal } from './Modal';
import './Card.css';
import logo from './dumbbell.jpg';
import { UserInfo } from '../../../Types/UserTypes';
import { AccountType } from '../../../Types/EnumTypes';

// TODO: Make card titles etc. a prop so we can use for 3 different things: applications received(coach), applications submitted(client), Postings created(coach)
// TODO: make userinfo come from global context
// TODO: make listings deactivatble and reactivatable
function ListingCard(props: (Listing & UserInfo)) {
    console.log(props);
    const isClient : boolean = props.userType === AccountType.Client;
    const isCoach : boolean = props.userType === AccountType.Coach;
    // TODO: Append all enum tags into a string array to be mapped (make a function or something)
    const tags : string[] = [];

    return (
        <Card>
            <Card.Header>
                <Table bordered={false}>
                        <tr>
                            <th>
                                {isClient ? "SUBMITTED AT" : "POSTING CREATED"}
                            </th>
                            <th>
                                PRICE
                            </th>
                            <th>
                                <>LISTING # {props.listingId}</>
                            </th>
                        </tr>

                        <tr>
                            <td>
                                {props.listingDate.toDateString()}    
                            </td>
                            <td>
                                <>${props.listingBody.price.price}/{props.listingBody.price.interval}</>
                            </td>
                            <td className="">
                                {/* TODO: move this to the right, make first 2 columns narrower */}
                                {/* Preview: previews what the coach/client will see when they open this lsiting */}
                                
                            </td>
                        </tr>
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
                        <Link to={`/${props.userId}/listings/${props.listingId}/edit`}>
                            <Card.Title>
                                {props.listingBody.title}
                            </Card.Title>
                        </Link>
                        <Card.Text>
                            {props.listingBody.description}
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
                        <Link to={`/${props.userId}/listings/${props.listingId}/edit`}>
                            <Button>Edit {isClient ? "Application" : "Posting"}</Button>
                        </Link>
                        
                        {props.listingBody.coach.coachInstagram &&
                        <Button>Instagram</Button>}

                        {props.listingBody.coach.coachWebsite &&
                        <Button>Website</Button>}

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

export { ListingCard };