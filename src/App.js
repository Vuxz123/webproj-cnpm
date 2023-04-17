import './App.css';
import Home from "./view/home/Home";
import React from "react";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import {BrowserRouter} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <Home/>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    );
}

export default App;
