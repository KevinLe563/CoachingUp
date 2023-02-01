import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './MainNavigation.css';


function MainNavigation() {
    return (
        <>
            <Button>
                <span />
                <span />
                <span />
                <span />
            </Button>
            <h1>
                <Link to="/">Find Coaching</Link>
            </h1>
            <nav>
                ...
            </nav>
        </>
    )
}

export {MainNavigation};