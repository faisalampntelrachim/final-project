import React from "react";
import axios from "./axios";

export class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            description: "",
            id: "",
            title: "",
            url: "",
            username: "",
            comment: "",
            created_at: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e) {
        this.setState(
            {
                file: e.target.files[0]
            },
            () =>
                console.log(
                    "HandleChange in // REVIEW:  component: ",
                    this.state
                )
        );
    }

    handleClick(e) {
        e.preventDefault();
        // this.setState({});
        var formData = new FormData();

        formData.append("file", this.state.file);
        console.log("This state:", this.state);
        axios
            .post("/panel", formData)
            .then(resp => {
                console.log("resp from post/panel handleclick:", resp);
                // this.imageurl.unshift(resp.data.image);
                // unshift the image. Put it in the front of an array
                this.props.addComments(resp.data.comments);
                // first: response.data[0].first,
                // last: response.data[0].last,
                // imageurl: response.data[0].imageurl,
                // bio: response.data[0].bio
            })
            .catch(err => {
                console.log("err in post/panel:", err);
            });
    }
    render() {
        return (
            <div>
                <div className="panel">
                    <h1>Here find all of our tours!</h1>
                    <input
                        type="description"
                        name="description"
                        onChange={this.handleChange}
                    />
                    <br />
                    <textarea
                        type="text"
                        name=""
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Save</button>
                    <br />
                    <input
                        type="file"
                        name=""
                        accept="image/*"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Upload</button>
                </div>
            </div>
        );
    }
}

// <input
//     type="file"
//     name=""
//     accept="image/*"
//     onChange={this.handleChange}
// />
