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
                if (response.data.resp.length == 0) {
                    //not existing profile
                    this.props.history.push("/");
                }
                // console.log("resp.data", response.data[0].id);
                console.log("the id is:", id);
                if (response.data.userId == id) {
                    //not to be able to go to my profile and add my self
                    // console.log("");
                    this.props.history.push("/");
                }
                if (response.data.success == false) {
                    //if it doesn't exist what i'm typing on the url
                    //     response.data[0].first;
                    //     response.data[0].last;
                    //     response.data[0].imageurl;
                    //     response.data[0].bio;
                    // if (id == this.props.id) {
                    //     this.props.history.push("/");
                    // }
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: response.data.resp[0].first,
                        last: response.data.resp[0].last,
                        imageurl: response.data.resp[0].imageurl,
                        bio: response.data.resp[0].bio
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
                    <h1 onClick={this.showModal}></h1>
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
