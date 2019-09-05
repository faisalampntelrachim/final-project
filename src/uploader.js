import React from "react";
// import axios from "./axios";

export class Uploader extends React.Component {
    constructor(props) {
        super(props); //why I must put props here?
        this.state = {};
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
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
                        onChange={this.props.handleChange}
                    />
                    <button onClick="handleClick">Upload</button>
                </form>
            </div>
        );
    }
}
