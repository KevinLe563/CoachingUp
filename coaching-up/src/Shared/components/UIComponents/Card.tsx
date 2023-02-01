import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { ListingInfo } from '../../../Types/ListingTypes';
import './Card.css';
import logo from './dumbbell.jpg';

function ListingCard(props: ListingInfo) {
    console.log(props);
    return (
        <Card>
            <Card.Header>
                <Table bordered={false}>
                        <tr>
                            <th>
                                LISTING CREATED
                            </th>
                            <th>
                                PRICE
                            </th>
                            <th>
                                <>LISTING # {props.listing_id}</>
                            </th>
                        </tr>

                        <tr>
                            <td>
                                {props.listing_date.toDateString()}    
                            </td>
                            <td>
                                <>${props.listingBody.price.price}/{props.listingBody.price.interval}</>
                            </td>
                            <td className="">
                                {/* TODO: move this to the right, make first 2 columns narrower */}
                                <a>View Listing Details</a>
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
                        <Link to={`/${props.listing_id}`}>
                            <Card.Title>
                                {props.listingBody.title}
                            </Card.Title>
                        </Link>
                        <Card.Text>
                            {props.listingBody.description}
                        </Card.Text>
                        {/* TODO: Check if tags is empty */}
                        {props.listingBody.tags && props.listingBody.tags.map(tag => {
                            return (
                                <Badge pill bg="info">
                                    {tag}
                                </Badge>
                            )
                            })}
                        
                    </Col>
                    <Col sm={2}>
                    <div className="button-container">
                        <Button>Edit</Button>
                        {props.listingBody.coach.coachInstagram &&
                        <Button>Instagram</Button>}
                        {props.listingBody.coach.coachWebsite &&
                        <Button>Website</Button>}
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