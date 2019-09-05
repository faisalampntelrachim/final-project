import React from "react";
import Profilepic from "./profilepic";
import { Uploader } from "./uploader";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "faisal",
            last: "last name",
            imageurl: "", //if i don't leave it empty then if I put a photo is default
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDiMount() {
        console.log("App mounted");

        axios
            .get("/users", this.state)
            .then(function(response) {
                this.setState({
                    first: response.data[0].first,
                    last: response.data[0].last,
                    imageurl: response.data[0].imageurl
                });
            })
            .catch(err => {
                console.log("err get /users", err);
            });

        axios
            .post("/users")
            .then(resp => {
                console.log("resp from post/users:", resp);
            })
            .catch(err => {
                console.log("err in post/users:", err);
            });
    }
    showModal() {
        this.setState({
            uploaderIsVisible: true
            // this.showModal = true;
            // this.imageId = imagesId;
        });
    }
    handleChange(e) {
        // we use this.setState to PUT information in state!
        this.setState(
            {
                [e.target.imageurl]: e.target.value,
                users: true
            },
            () => console.log("HandleChange in app component: ", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({});

        axios
            .post("/upload")
            .then(resp => {
                console.log("resp from post/upload handleclick:", resp);
                this.imageurl.unshift(resp.data[0]); // unshift the image. Put it in the front of an array
            })
            .catch(err => {
                console.log("err in post/upload:", err);
            });
    }

    render() {
        return (
            <div>
                <form>
                    <h1 onClick={this.showModal}>Hello from App</h1>
                    <img src="socialnetwork.jpg" />
                    <Profilepic
                        first={this.state.first} // no comma here
                        last={this.state.last}
                        imageurl={this.state.imageurl}
                        showModal={this.showModal}
                    />
                    {this.state.uploaderIsVisible}
                    <Uploader
                        onClick={this.handleClick}
                        handleChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}
