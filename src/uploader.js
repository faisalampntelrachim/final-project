import React from "react";
import axios from "./axios";

export class Uploader extends React.Component {
    constructor(props) {
        super(props); //why I must put props here?
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e) {
        // we use this.setState to PUT information in state!
        this.setState(
            {
                file: e.target.files[0]
            },
            () =>
                console.log("HandleChange in uploader component: ", this.state)
        );
    }
    // handleSubmit(e) {
    //     e.preventDefault();
    // }

    handleClick(e) {
        e.preventDefault();
        // this.setState({});
        var formData = new FormData();

        formData.append("file", this.state.file);
        console.log("This state:", this.state);
        axios
            .post("/upload", formData)
            .then(resp => {
                console.log("resp from post/upload handleclick:", resp);
                // this.imageurl.unshift(resp.data.image);
                // unshift the image. Put it in the front of an array
                this.props.updateImageurl(resp.data.image);
            })
            .catch(err => {
                console.log("err in post/upload:", err);
            });
    }
    render() {
        return (
            <div>
                <h3>Want to change your image!</h3>
                <form>
                    <input
                        type="file"
                        name=""
                        accept="image/*"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Upload</button>
                </form>
            </div>
        );
    }
}
