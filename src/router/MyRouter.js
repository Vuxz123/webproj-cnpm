import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../view/home/Home";
import CartView from "../view/cart/Cart";
import AddProduct from "../view/seller/AddProduct";
import SellingStatisticView from "../view/seller/ViewSellingStatistic";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/cart",
        element: <CartView/>,
    },
    {
        path: "/addpro",
        element: <AddProduct/>,
    },
    {
        path: "/stat",
        element: <SellingStatisticView/>
    }
]);

function MyRouter() {
    return (
        <RouterProvider router={router}/>
    );
}

export default MyRouter;