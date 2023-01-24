import React from 'react';

import './Card.css';
import logo from './logo512.png';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ListingInfo } from '../../../Types/ListingTypes';

function ListingCard(props: ListingInfo) {
    console.log(props);
    return (
        <Card>
            <Row>
                <Col>
                    <Card.Img alt="listing image" src={logo}/>
                </Col>
                <Col>
                    <Row>
                        <Card.Body>
                            <>
                                <Link to={`/${props.listing_id}`}>
                                    <Card.Title>
                                        {props.listingBody.title}
                                    </Card.Title>
                                </Link>
                                <Card.Text>
                                    {props.listingBody.description}
                                </Card.Text>
                            </>
                        </Card.Body>
                    </Row>
                    <Row>
                        <Button>Edit</Button>
                    </Row>
                </Col>
            </Row>
            <Card.Body>
                {props.listingBody.tags.map(tag => {
                    return (
                        <Badge pill bg="info">
                            {tag}
                        </Badge>
                    )
                })}
            </Card.Body>
        </Card>
    )
}

export { ListingCard };