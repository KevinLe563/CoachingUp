import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, NavDropdown } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import './MainNavigation.css';
import { User } from '../../../Types/UserTypes';
import { AccountType } from '../../../Types/EnumTypes';
import { AuthContext } from '../../context/AuthContext';
import { LoadingContext } from '../../context/LoadingContext';

function MainNavigation() {
    // TODO: fetch from backend or use a context
    const userType : AccountType = AccountType.COACH;
    const isCoach = userType === AccountType.COACH;
    const loading = useContext(LoadingContext);
    const auth = useContext(AuthContext);
    return (
        <>
        {(!loading.isLoading &&
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
                        {auth.isLoggedIn &&
                            <>
                            <Nav.Link as={Link} to="/user/listings">My Postings</Nav.Link>
                            {isCoach &&
                            <Nav.Link as={Link} to="/uid/listings/new">New Posting</Nav.Link>}
                            <NavDropdown title="Profile" id="navbarScrollingDropdown">
                                <NavDropdown.Item hreef="">1</NavDropdown.Item>
                                <NavDropdown.Item hreef="">1</NavDropdown.Item>
                                <NavDropdown.Item hreef="">1</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={auth.logout}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                            </>
                        }

                    </Nav>
                    {auth.isLoggedIn && <Form className="d-flex">
                        <Form.Control 
                            type="search"
                            placeholder="search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>}
                    <div className='d-flex'>
                    {!auth.isLoggedIn &&
                        <Nav.Link as={Link} to="/auth">
                            <Button>Sign In</Button>
                        </Nav.Link>
                    }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )}
        </>
    )
}

export {MainNavigation};