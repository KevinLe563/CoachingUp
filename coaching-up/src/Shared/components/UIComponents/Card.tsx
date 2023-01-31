import React from 'react';

import './Card.css';
import logo from './dumbbell.jpg';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ListingInfo } from '../../../Types/ListingTypes';

function ListingCard(props: ListingInfo) {
    console.log(props);
    return (
        <Card>
            <Card.Header>
                <Row md={3}>
                {/* headers */}
                <Col>
                LISTING CREATED
                </Col>
                <Col>
                    PRICE
                </Col>
                <Col className='idInfo'>
                    <>LISTING # {props.listing_id}</>
                </Col>
                {/* values */}
                <Col>
                    {props.listing_date.toISOString()}
                </Col>
                <Col>
                    <>${props.listingBody.price.price}/{props.listingBody.price.interval}</>
                </Col>
                <Col className='idInfo'>
                    <a>View Listing Details</a>
                </Col>
                </Row>
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