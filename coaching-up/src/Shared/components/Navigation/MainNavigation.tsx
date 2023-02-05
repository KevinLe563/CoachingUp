import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Nav, NavDropdown } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import './MainNavigation.css';
import { UserInfo } from '../../../Types/UserTypes';
import { AccountType } from '../../../Types/EnumTypes';


function MainNavigation() {
    // TODO: fetch from backend
    const userType : AccountType = AccountType.Coach;

    const isCoach = userType === AccountType.Coach;
    return (
        <Navbar expand="lg">
            <Container fluid>
                {/* TODO: ADD LINKS */}
                <Navbar.Brand as={Link} to="/">Find Coaching</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/user/listings">My Postings</Nav.Link>
                        {isCoach &&
                        <Nav.Link as={Link} to="/uid/listings/new">New Posting</Nav.Link>}
                        <NavDropdown title="Profile" id="navbarScrollingDropdown">
                            <NavDropdown.Item hreef="">1</NavDropdown.Item>
                            <NavDropdown.Item hreef="">1</NavDropdown.Item>
                            <NavDropdown.Item hreef="">1</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item hreef="">Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control 
                            type="search"
                            placeholder="search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export {MainNavigation};