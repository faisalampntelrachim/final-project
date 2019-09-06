import React from "react";
import Profilepic from "./profilepic";
import { Uploader } from "./uploader";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "faisal",
            last: "last name",
            imageurl: "", //if i don't leave it empty then if I put a photo is default
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.updateImageurl = this.updateImageurl.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
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
    updateImageurl(img) {
        this.setState({
            imageurl: img
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
                        updateImageurl={this.updateImageurl}
                    />
                </form>
            </div>
        );
    }
}

//     render() {
//         return (
//             <div>
//                 <form>
//                     <h1 onClick={this.showModal}>Hello from App</h1>
//                     <img src="socialnetwork.jpg" />
//                     <Profilepic
//                         first={this.state.first} // no comma here
//                         last={this.state.last}
//                         imageurl={this.state.imageurl}
//                         showModal={this.showModal}
//                     />
//                     // <Profile
//                     // profile:{(
//                     //     <Profilepic
//                     //         size="xl"
//                     //         first={this.state.first} // no comma here
//                     //         last={this.state.last}
//                     //         imageurl={this.state.imageurl}
//                     //         showModal={this.showModal}
//                     //     />
//                     // )},
//                     // imageurl={this.state.imageurl}
//                     // first={this.state.first} // no comma here
//                     // last={this.state.last}
//                     // showUploader={(=> this.setState({uploaderVisible:}))}
//                     // bio={this state.bio}
//                     // setBio={bio => {}}    //setBio function
//                     // />
//                     // {this.state.uploaderIsVisible}
//                     <Uploader onClick={this.handleClick} handleChange={this.handleChange}/>
//                 </form>
//             </div>
//         );
//     }
// }
