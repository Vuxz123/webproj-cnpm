import React, {useEffect, useState} from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import ReactSearchBox from "react-search-box";
import ShoppingCartNav from "./ShoppingCartNav";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import server from "../../util/restful/Server";
import {useNavigate} from "react-router-dom";

function NavigationBar() {
    const { loginWithRedirect, isAuthenticated, isLoading, logout, user} = useAuth0();
    const [login, setLogin] = useState(isAuthenticated);
    const [seller, setSeller] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await server.get('/seller/' + user.sub);
            if (res.data != null) setSeller(true);
        }

        fetchData();
    }, [user])

    const navigate = useNavigate();

    if (!isLoading && isAuthenticated && !login) {
        setLogin(true);
    }

    const loginHandler = () => {
        if (isAuthenticated) return;
        loginWithRedirect().catch();
    };

    const logoutHandler = () => {
        logout({ returnTo: window.location.origin });
    };

    const registerAsSellerHandler = async () => {
        try {
            const res = await server.get('/seller/create/' + user.sub);
            console.log(res);
            setSeller(true);
        }catch (error) {
            console.log(error);
        }
    };

    const a = (
        <Navbar bg="light" expand="lg">
            <Link to="/">
                <Navbar.Brand href="#home">My Website</Navbar.Brand>
            </Link>
            <Nav>
                <Link to="/">
                    <Nav.Link>Home</Nav.Link>
                </Link>
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
            <Link to="/">
                <Navbar.Brand href="#home">My Website</Navbar.Brand>
            </Link>
            <Nav className="mr-auto">
                <Link to="/">
                    Home
                </Link>
            </Nav>
            <Nav>
                <ReactSearchBox/>
            </Nav>
            <Nav>
                <ShoppingCartNav/>
                <Menu>
                    <MenuButton as={Button} variant="outline-secondary">
                        Profile
                    </MenuButton>
                    <MenuList>
                        {!seller ? (
                            <MenuItem onClick={registerAsSellerHandler}>Register As Seller</MenuItem>
                        ) : (
                            <div>
                                <MenuItem onClick={() => navigate('/addpro')}>Add Product</MenuItem>
                                <MenuItem onClick={() => navigate('/stat')}>View Statistic</MenuItem>
                            </div>
                        )}
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Nav>
        </Navbar>
    );

    return login ? b : a;
}

export default NavigationBar;
