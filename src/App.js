import './App.css';
import React from "react";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import {ChakraProvider} from "@chakra-ui/react";
import MyRouter from "./router/MyRouter";

function App() {

    return (
        <ChakraProvider>
            <Auth0ProviderWithHistory>
                <MyRouter/>
            </Auth0ProviderWithHistory>
        </ChakraProvider>
    );
}

export default App;
