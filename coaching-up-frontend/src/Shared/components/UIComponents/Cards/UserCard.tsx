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
import logo from './dumbbell.jpg';
import { User } from '../../../../Types/UserTypes';

export function UserProfileCard(props : User) {
    return (
        <Card>
            <Card.Header>
                Personal Profile
            </Card.Header>
            <Row>
                <Card.Body>
                    {props.fname} {props.lname} {props.email}
                </Card.Body>
            </Row>
        </Card>
    )
}