import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ProviderContext from "./context/ProviderContext.jsx";

const root = createRoot(document.getElementById('root'));

root.render(
<BrowserRouter>
<ProviderContext>

<Auth0Provider
    domain="dev-adw6l8hr7034diri.us.auth0.com"
    clientId="mU7GiKXbt87Yd4rSOT59ARPSxiB02Fq0"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <App />
  </Auth0Provider>,
    </ProviderContext>
    </BrowserRouter>
);