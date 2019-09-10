import React from "react";
import axios from "./axios";
// import { BrowserRouter, Route } from "react-router-dom";
// import Profile from "./profile";
// import ProfilePic from "./profilepic";
// import BioEditor from "./bioeditor";
// import { Route } from "react-router-dom";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("App mounted");
        const id = this.props.match.params.id;
        axios
            .get("/users/" + id)
            .then(response => {
                console.log(
                    "axios get users with match.params.id:",
                    response.data
                );
                if (response.data != null) {
                    response.data[0].first;
                    response.data[0].last;
                    response.data[0].imageurl;
                    response.data[0].bio;
                } else {
                    this.props.history.push("/");
                }

                this.setState({
                    first: response.data[0].first,
                    last: response.data[0].last,
                    imageurl: response.data[0].imageurl,
                    bio: response.data[0].bio
                });
            })

            .catch(err => {
                console.log("err get /users/:id", err);
            });
        // axios.get("/users/:id" + id).then(resp => {
        //     console.log("resp from axios users :", resp);
        //     this.props.match.params.id;
        // });
        // if ("/users/" + this.props.match.params.id) {
        //     this.state.first, this.state.last;
        //     this.state.imageurl;
        //     this.state.bio;
        // } else {
        //     this.props.history.push("/");
        // }
    }
    render() {
        return (
            <div>
                <img src={this.state.imageurl} />
                <h1>
                    {this.state.first}
                    {this.state.last}
                    {this.state.bio}
                </h1>
            </div>
        );
    }
}

// <Route
//     path="/user/:id"
//     render={props => (
//         <OtherProfile
//             key={props.match.imageurl}
//             match={props.match}
//             history={props.history}
//         />
//     )}
// />;
//this state.first
// return;
