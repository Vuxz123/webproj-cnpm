import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {

    // const history = useNavigate();
    //
    // const onRedirectCallback = (appState) => {
    //     history(appState?.returnTo || window.location.pathname);
    // };

    console.log(window.location.origin);

    return (
        <Auth0Provider
            domain="ethnicthv.jp.auth0.com"
            clientId="5u1BaXCl0rj1gZRnWzVFGdEqtoUJ2G74"
            redirectUri={window.location.origin}
            //onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;