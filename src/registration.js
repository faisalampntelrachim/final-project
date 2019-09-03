import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        // solution to error "cannot read property setState of undefined" is the below code:
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // we use this.setState to PUT information in state!
        this.setState(
            {
                [e.target.name]: e.target.value,
                users: true
            },
            () => console.log("this.state: ", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        // we use this.setState to PUT information in state
        axios
            .post("/welcome", this.state)
            .then(function(resp) {
                location.replace("/logo");
                console.log("resp from post/logo:", resp);
                // me.images.unshift(resp.data[0]); // unshift the image. Put it in the front of an array
            })
            .catch(function(err) {
                console.log("err in post/welcome:", err);
            });
    }
    render() {
        return (
            <div onSubmit={this.handleSubmit}>
                <h1> Welcome to the Social network</h1>
                <h2> Please Register Here</h2>
                <form>
                    <input
                        name="first"
                        placeholder="first"
                        onChange={this.handleChange}
                    />
                    <input
                        name="last"
                        placeholder="last"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <button>submit</button>
                </form>
            </div>
        );
    }
}

// handleSubmit(e) {
//     e.preventDefault();
//     // we use this.setState to PUT information in state
//                 axios
//                     .post("/registration",this.state)
//                     .then(function(resp) {
//                         location.replace("./")
//                         console.log("resp from post/upload:", resp);

//                     })
//                     .catch(function(err) {
//                         console.log("err in post/welcome:", err);
//                     });
// }

// onChange = { e => this.handleChange(e) }
//
// class Welcome extends React.Component {
//     constructor() {
//         super()
//     }
//
//     render() {
//         return (
//             <div>
//                 <Registration />
//             </div>
//         )
//     }
// }
//
// export default function Hello() {
//     return (
//         <div>Hello, World!</div>
//     );
// }
