import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Reviews() {
    const [search, setSearch] = useState(""); //1st is the state and 2nd the function to set the state

    // to find only 3
    useEffect(() => {
        axios.get("/reviews").then(response => {
            console.log("axios get users with match.params.id:", response.data);

            // this.props.getComments(response.data.comment);
            this.setState({
                first: response.data.resp[0].first,
                last: response.data.resp[0].last,
                imageurl: response.data.resp[0].imageurl,
                bio: response.data.resp[0].bio
            });
        });
    }, []);

    // its like componentdidmount
    //to find all of those  users
    // useEffect(() => {
    //     console.log("Use effect running");
    //     console.log("about to make axios request");
    //     axios
    //         .get("/findusers/" + search)
    //         // + search
    //         .then(response => {
    //             let ignore = false;
    //             console.log("resp from useEffect in find users:", response);
    //             if (!ignore) {
    //                 setUsers(response.data);
    //                 // console.log(
    //                 //     "axios get findusers with params.id:",
    //                 //     response.data
    //                 // );
    //             } else {
    //                 console.log("ignored");
    //             }
    //         });
    //     // let ignore = false;
    // }, [search]);

    const handleChange = e => {
        setSearch(e.target.value);
        axios
            .post("/reviews")
            .then(resp => {
                console.log("resp from post/panel handleclick:", resp);
                // this.imageurl.unshift(resp.data.image);
                // unshift the image. Put it in the front of an array
                // this.props.addComments(resp.data.comment);
                // first: response.data[0].first,
                // last: response.data[0].last,
                // imageurl: response.data[0].imageurl,
                // bio: response.data[0].bio
            })
            .catch(err => {
                console.log("err in post/panel:", err);
            });
        // }
    };

    // const onSearchClick = e => setUsers(e.target.value);

    // export class Reviews extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             comments: [],
    //             id: "",
    //             username: "",
    //             comment: "",
    //             created_at: ""
    //         };
    //         this.handleChange = this.handleChange.bind(this);
    //         this.handleClick = this.handleClick.bind(this);
    //     }
    //     componentDidMount() {
    //         console.log("App mounted");
    //         // const id = this.props.match.params.id;
    //
    //         axios.get("/users/").then(response => {
    //             console.log("axios get users with match.params.id:", response.data);
    //
    //             // this.props.getComments(response.data.comment);
    //             this.setState({
    //                 first: response.data.resp[0].first,
    //                 last: response.data.resp[0].last,
    //                 imageurl: response.data.resp[0].imageurl,
    //                 bio: response.data.resp[0].bio
    //             });
    //         });
    //     }
    //     handleChange(e) {
    //         this.setState(
    //             {
    //                 file: e.target.files
    //             },
    //             () => console.log("HandleChange in panel component: ", this.state)
    //         );
    //     }
    //
    //     handleClick(e) {
    //         e.preventDefault();
    //         // this.setState({});
    //         // var formData = new FormData();
    //
    //         // formData.append("file", this.state.file);
    //         console.log("This state:", this.state);
    //         axios
    //             .post("/panel")
    //             .then(resp => {
    //                 console.log("resp from post/panel handleclick:", resp);
    //                 // this.imageurl.unshift(resp.data.image);
    //                 // unshift the image. Put it in the front of an array
    //                 // this.props.addComments(resp.data.comment);
    //                 // first: response.data[0].first,
    //                 // last: response.data[0].last,
    //                 // imageurl: response.data[0].imageurl,
    //                 // bio: response.data[0].bio
    //             })
    //             .catch(err => {
    //                 console.log("err in post/panel:", err);
    //             });
    //     }
    // render() {
    return (
        <div>
            <div className="panel">
                <h1>Please tell us about your experience in the tours!</h1>
                <textarea type="text" name="" onChange={this.handleChange} />
                <br />
                <button onClick={this.handleClick}>Save</button>
            </div>
        </div>
    );
}
// }
// <input
//     type="file"
//     name=""
//     accept="image/*"
//     onChange={this.handleChange}
// />
// export default function Panel() {
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState(""); //1st is the state and 2nd the function to set the state
//
//     // to find only 3
//     useEffect(() => {
//         axios
//             .get("/panel")
//             .then(response => {
//                 console.log("response.data:", response.data);
//                 setUsers(response.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, []);
//
//     // its like componentdidmount
//     //to find all of those  users
//     useEffect(() => {
//         console.log("Use effect running");
//         console.log("about to make axios request");
//         axios
//             .get("/panel/" + search)
//             // + search
//             .then(response => {
//                 let ignore = false;
//                 console.log("resp from useEffect in find users:", response);
//                 if (!ignore) {
//                     setUsers(response.data);
//                     // console.log(
//                     //     "axios get findusers with params.id:",
//                     //     response.data
//                     // );
//                 } else {
//                     console.log("ignored");
//                 }
//             });
//         // let ignore = false;
//     }, [search]);
//
//     const handleChange = e => {
//         setSearch(e.target.value);
//     };

// export default function Panel() {
//     const dispatch = useDispatch();
//     const friends = useSelector(
//         state =>
//             state.friends &&
//             state.friends.filter(friends => friends.accepted == true)
//     );
//     const wannabes = useSelector(
//         state =>
//             state.friends &&
//             state.friends.filter(friends => friends.accepted == false)
//     );
//     console.log("friends", friends);
//     console.log("wannnabes", wannabes);
//     useEffect(() => {
//         dispatch(receiveFriendsWannabes());
//     }, []);
//
//     if (!friends) {
//         return null;
//     }
