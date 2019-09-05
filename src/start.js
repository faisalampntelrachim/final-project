import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
    // if user is on /welcome route, that means user is NOT logged in
    // and we should render the Registration component.
} else {
    elem = <App />;
    <img src="social.network.jpg" />;
    // if else runs, that means user IS logged in. For now we will just render an img
}
// elem = location.pathname === '/welcome' ? <Hello /> : <p>aksjda</p>
ReactDOM.render(elem, document.querySelector("main"));
