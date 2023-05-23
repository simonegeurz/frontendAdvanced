import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"
import "./i18n";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "individualproject.eu.auth0.com";
const clientId = "PjsANgDC9SfUTJKUEkns6CBWLoJRHX18";

const providerConfig = {
  domain: domain,
  clientId: clientId,
  redirectUri: window.location.origin,
};
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Suspense fallback={<div>Loading ...</div>}>
          <Auth0Provider {...providerConfig}>
            <App />
          </Auth0Provider>,
      </Suspense>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
