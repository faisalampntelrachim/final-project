import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";

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
                // if (response.data != null) {
                //     response.data[0].first;
                //     response.data[0].last;
                //     response.data[0].imageurl;
                //     response.data[0].bio;
                if (response.data.success == false) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: response.data[0].first,
                        last: response.data[0].last,
                        imageurl: response.data[0].imageurl,
                        bio: response.data[0].bio
                    });
                }
            })

            .catch(err => {
                console.log("err get /users/:id", err);
            });
    }
    render() {
        return (
            <div className="otherprofile">
                <div className="other">
                    <header>
                        <h1 onClick={this.showModal}></h1>
                    </header>
                </div>

                <img src={this.state.imageurl} />
                <h2>
                    {this.state.first}

                    {this.state.last}
                    <br />

                    {this.state.bio}
                </h2>
                <FriendButton id={this.props.match.params.id} />
            </div>
        );
    }
}
