import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

import './MainNavigation.css';


function MainNavigation() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Find-Coaching</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export {MainNavigation};