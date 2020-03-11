import React from 'react';
import { Link } from "@reach/router";
import { Navbar, Nav } from 'react-bootstrap';

// NavBar
const NavBar = props => {
    return (
        <Navbar className="px-5 py-4 m-4 fade-in-top" expand="md">
            <h1 className="m-0 p-0 align-middle" href="#">The API Guy.</h1>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav align-middle">
                <Nav className="mr-auto ml-5 align-middle">
                    <Link className="align-middle text-secondary text-decoration-none my-auto" to="/get-started">Get Started!</Link>

                </Nav>
                <Nav className="ml-auto align-middle">
                    <Link className="align-middle text-secondary text-decoration-none mx-3" to="/coming-soon/API">What is an API?</Link>
                    <Link className="align-middle text-secondary text-decoration-none mx-3" to="/coming-soon/USE">How to use it?</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

// ComingSoon
const ComingSoon = props => {
    return (
        <div style={{ height: 'calc(87.5vh - 144px)' }} className="fade-in text-secondary w-100 d-flex align-items-center text-center">
            <ul className="list-inline mx-auto">
                <li>
                    <h3 className="w-100 d-block mx-auto mb-3">'{props.page === 'API' ? 'What is an API?' : 'How to use it?'}' page comming soon.</h3>
                </li>
                <li>
                    <p className="mb-0 mx-auto">Check back in with us later.</p>
                    <p className="mx-auto">In the meantime, be cool and keep coding!  <span aria-label="cooley-face" role="img">😉</span><span aria-label="cooley-face" role="img">🤪</span></p>
                </li>
            </ul>
        </div>
    );
}

// Export Components
export { NavBar, ComingSoon };
