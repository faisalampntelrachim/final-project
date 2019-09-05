import React from "react";
// import ReactDOM from "react-dom";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <img src="socialnetwork.jpg" />
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
