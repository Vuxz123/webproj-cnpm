import React from "react";
import {Button} from "@chakra-ui/react";
import {FaShoppingCart} from "react-icons/fa";
import {Link} from "react-router-dom";


function ShoppingCartNav() {

    return (
        <Link to="/cart">
            <Button>
                <FaShoppingCart/>
            </Button>
        </Link>
    )
}

export default ShoppingCartNav;