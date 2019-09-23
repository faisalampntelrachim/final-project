import React from "react";
import axios from "./axios";
// import Login from "./login";
import { Link } from "react-router-dom";
// import "./registration.css";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /// I must initialize the error
            error: false
        };
        // solution to error "cannot read property setState of undefined" is the below code:
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // we use this.setState to PUT information in state!
        this.setState(
            {
                [e.target.name]: e.target.value,
                users: true
            },
            () =>
                console.log(
                    " err HandleChange in registration component: ",
                    this.state
                )
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        // we use this.setState to PUT information in state
        axios
            .post("/register", this.state)
            .then(resp => {
                console.log("resp from post/logo:", resp);
                if (resp.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(function(err) {
                console.log("err in post/register:", err);
            });
    }
    render() {
        return (
            <div className="registration">
                {this.state.error && <p>Oops wrong!Try again!</p>}
                <h1>Discover Berlin</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="first"
                        placeholder="first"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="last"
                        placeholder="last"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <h2> Please Register Here</h2>
                    <button>submit</button>
                </form>
                <Link to="/login">Log in</Link>
            </div>
        );
    }
}
