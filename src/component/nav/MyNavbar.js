import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import ReactSearchBox from "react-search-box";

function NavigationBar() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const [login, setLogin] = useState(isAuthenticated);
    if(!isLoading && isAuthenticated && !login) {
        setLogin(true);
    }
    const loginHandler = () => {
        if(isAuthenticated) return;
        loginWithRedirect();
    };

    const a = (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">My Website</Navbar.Brand>
            <Nav>
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
                <ReactSearchBox placeholder={"Search for item"} style={{ width: "100%", height: "40" }}/>
            </Nav>
            <Nav>
                <Button variant="outline-primary" onClick={loginHandler}>Login</Button>
            </Nav>
        </Navbar>
    );

    const b = (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">My Website</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <Nav>
                <ReactSearchBox/>
            </Nav>
            <Nav>
                <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
        </Navbar>
    );

    return login ? b : a;
}

export default NavigationBar;
