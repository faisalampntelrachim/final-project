import React from "react";
import Profile from "./profile";
import Profilepic from "./profilepic";
import { Uploader } from "./uploader";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import OtherProfile from "./otherprofile";
import FindUsers from "./findusers";
// import CuteAnimals from "./cuteanimals";
import Friends from "./friends";
import { Chat } from "./chat";
import Reviews from "./reviews";
import { Offers } from "./offers";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageurl: "", //if i don't leave it empty then if I put a photo is default
            bio: "",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.updateImageurl = this.updateImageurl.bind(this);
        this.setBio = this.setBio.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log("App mounted");

        axios
            .get("/user", this.state)
            .then(response => {
                console.log("axios get user", response);
                this.setState({
                    first: response.data[0].first,
                    last: response.data[0].last,
                    imageurl: response.data[0].imageurl,
                    bio: response.data[0].bio
                });
            })
            .catch(err => {
                console.log("err get /user", err);
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
    setBio(bio) {
        //data comes from axios
        this.setState({
            bio: bio
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <header>
                            <h1 onClick={this.showModal}></h1>
                            <nav>
                                <Link to="/">Profile</Link>
                                <Link to="/offers">Offers</Link>
                                <Link to="/chat">Chat</Link>
                                <Link to="/reviews">Reviews</Link>
                                <a href="/logout">Log out</a>
                            </nav>
                            <img src="/Brandeburger-tor.jpg" />
                            <Profilepic
                                first={this.state.first} // no comma here
                                last={this.state.last}
                                imageurl={this.state.imageurl}
                                showModal={this.showModal}
                            />
                        </header>
                    </div>
                    <div id="animate-area">
                        <img src="/Ampelmann.png" />
                    </div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                imageurl={this.state.imageurl}
                                onClick={this.showUploader}
                                setBio={this.setBio}
                                bio={this.state.bio}
                                showModal={this.showModal}
                            />
                        )}
                    />
                    <div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                onClick={this.handleClick}
                                handleChange={this.handleChange}
                                updateImageurl={this.updateImageurl}
                            />
                        )}
                    </div>
                    <Route
                        path="/user/:id"
                        render={props => (
                            <OtherProfile
                                key={props.match.imageurl}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                </div>
                <Route
                    path="/users"
                    render={props => (
                        <FindUsers
                            key={props.match}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
                <Route exact path="/friends" render={() => <Friends />} />
                <Route
                    path="/chat"
                    render={props => (
                        <Chat
                            key={props.match}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
                <Route exact path="/reviews" render={() => <Reviews />} />
                <Route exact path="/offers" render={() => <Offers />} />
            </BrowserRouter>
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
// a link doesn't work with LINK i must use href because is SPA and it will only refresh the page and not redirect me somewhere
// <img src="socialnetwork.jpg" />
//<Route exact path="/chat" componenet={Chat} />
//<Route exact path="/chat" componenet={Chat} />
// <Link to="/users">Find users</Link>
