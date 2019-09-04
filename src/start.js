import React from "react";
import ReactDOM from "react-dom";
// import Registration from "./registration";
import Welcome from "./welcome";

// import axios from "./axios";
// import Login from "./login";
// import { HashRouter, Route, Link } from "react-router-dom";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
    // if user is on /welcome route, that means user is NOT logged in
    // and we should render the Registration component.
} else {
    elem = <h1>SOCIAL NETWORK</h1>;
    // <img src="marvin-meyer-SYTO3xs06fU-unsplash.jpg" />;
    // if else runs, that means user IS logged in. For now we will just render an img
}
// elem = location.pathname === '/welcome' ? <Hello /> : <p>aksjda</p>
ReactDOM.render(elem, document.querySelector("main"));
