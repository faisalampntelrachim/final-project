import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";

// ReactDOM.render(<HelloWorld />, document.querySelector("main"));
//
// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

let elem;
if (location.pathname === "/welcome") {
    elem = <Registration />;
    // if user is on /welcome route, that means user is NOT logged in
    // and we should render the Registration component.
} else {
    elem = <h1>SOCIAL NETWORK</h1>;
    // <img src="marvin-meyer-SYTO3xs06fU-unsplash.jpg" />;
    // if else runs, that means user IS logged in. For now we will just render an img
}
// elem = location.pathname === '/welcome' ? <Hello /> : <p>aksjda</p>
ReactDOM.render(elem, document.querySelector("main"));
