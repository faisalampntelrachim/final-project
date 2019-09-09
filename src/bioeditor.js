import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdited: false
            // bio: ""
            // error: true
        };
        this.showBioEditor = this.showBioEditor.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    showBioEditor(e) {
        e.preventDefault();
        //turns on the text area
        this.setState({
            isEdited: true
            // this.showModal = true;
            // this.imageId = imagesId;
        });
    }
    handleClick(e) {
        // turns off the text area  it works as the handle click here
        e.preventDefault(); // it prevents from refreshing the page
        axios
            .post("/bio", this.state)
            .then(resp => {
                this.props.setBio(resp.data.rows[0].bio);
                this.setState({
                    isEdited: false
                }); //this is the bio in db query
                console.log(
                    "resp from post axios /bio:",
                    resp.data.rows[0].bio
                );
                // this.setState({
                //     isEdited: false
                // });
            })
            .catch(function(err) {
                console.log("err in post  axios /bio:", err);
            });
    }
    handleChange(e) {
        console.log("this.props in handlechange", this.props);
        //when they type a bio
        // console.log(e.target.value);
        // we use this.setState to PUT information in state!
        this.setState(
            {
                // bio: e.target.bio
                newbio: e.target.value
                // [e.target.name]: e.target.value
                // users: true
            },
            () =>
                console.log(
                    " HandleChange in bioeditor component: ",
                    this.state
                )
        );
    }
    render() {
        let elem;
        if (this.state.isEdited) {
            elem = (
                <div className="bioeditor1">
                    {this.props.bio}
                    <textarea onChange={this.handleChange} />
                    <button onClick={this.handleClick}>Save</button>
                </div>
            );
        } else {
            if (this.props.bio != null) {
                elem = (
                    <div>
                        <h1>Add your bio!</h1>
                        {this.props.bio}
                        <button onClick={this.showBioEditor}>Add</button>
                    </div>
                );
            } else {
                elem = (
                    <div className="bioeditor2">
                        {this.props.bio}
                        <h1>No bio yet!Add your bio!</h1>
                        <button onClick={this.showBioEditor}>Edit</button>
                    </div>
                );
            }
        }
        return elem;
    }
}

// {this.props.bio}
// = (
//     <div>
//         {this.props.bio}
//         <button></button>
//     </div>
// axios
//     .post("/bio", this.state.bio)
//     .then(resp => {
//         this.props.showBioEditor(resp.data.bio);
//         console.log("resp from post/bio:", resp);
//     })
//     .catch(function(err) {
//         console.log("err in post/bio:", err);
//     });
