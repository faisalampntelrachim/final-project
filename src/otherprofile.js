import React from "react";
import axios from "./axios";

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
    }
    render() {
        return (
            <div className="otherprofile">
                <img src={this.state.imageurl} />
                <h2>
                    {this.state.first}

                    {this.state.last}
                    <br />

                    {this.state.bio}
                </h2>
            </div>
        );
    }
}
