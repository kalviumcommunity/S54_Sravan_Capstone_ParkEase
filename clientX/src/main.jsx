import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ProviderContext from "./context/ProviderContext.jsx";

const root = createRoot(document.getElementById('root'));
console.log(import.meta.env.VITE_DOMAIN)
// console.log(import.meta.env.VITE_CLIENT_ID)
root.render(
<BrowserRouter>
<ProviderContext>

<Auth0Provider
    domain={import.meta.env.VITE_DOMAIN}
    clientId={import.meta.env.VITE_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <App />
  </Auth0Provider>
    </ProviderContext>
    </BrowserRouter>
);