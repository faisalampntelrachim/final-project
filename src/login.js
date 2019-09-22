import React from "react";
import axios from "./axios"; //this is file not a module
import { Link } from "react-router-dom";
// import Registration from "./registration";
// import { HashRouter, Route } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /// I must initialize the error
            error: false
        };

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

        axios
            .post("/login", this.state)
            .then(resp => {
                console.log("resp from axios post/login:", resp);
                if (resp.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(function(err) {
                console.log("err in axios post/login:", err);
            });
    }
    render() {
        return (
            <div className="login">
                {this.state.error && <p>Oops wrong!Try again!</p>}
                <h1>Tour guides all over Berlin</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <h2> Please Log in Here</h2>
                    <button onSubmit={this.handleSubmit}>Log in</button>
                </form>
                <Link to="/">Register</Link>
            </div>
        );
    }
}

// render() {
//     return(
//         <HashRouter>
//             <div>
//                 <h1>Welcome to the Social Network</h1>
//                 // <img src="/welcome.jpg" alt="Welcome"/>
//             <HashRouter>
//                     <div>
//                         <Route path="/" component={Registration}/>
//                         <Route path="/login" component={Login}/>
//                         <Route path="/" component={LoginLink}/> // <Redirect path="*" to="/"/>
//                     </div>
//                     <Link to ="/login">Log in</Link>
//                 </div>
//         </HashRouter>
//     );
// }
