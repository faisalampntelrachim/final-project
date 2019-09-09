// import React from "react";
// // import axios from "./axios";
// import { BrowserRouter, Route } from "react-router-dom";
// import Profile from "./profile";
//
// export default class OtherProfile extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         return (
//             <BrowserRouter>
//                 <div>
//                     <Route
//                         exact
//                         path="/"
//                         render={() => (
//                             <Profile
//                                 id={this.state.id}
//                                 first={this.state.first}
//                                 last={this.state.last}
//                                 image={this.state.image}
//                                 onClick={this.showUploader}
//                                 bio={this.state.bio}
//                                 setBio={this.setBio}
//                             />
//                         )}
//                     />
//                     <Route path="/user/:id" component={OtherProfile} />
//                 </div>
//             </BrowserRouter>
//         );
//     }
// }
