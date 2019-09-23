import React from "react";
import axios from "./axios";

export class Panel extends React.Component {
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
            () => console.log("HandleChange in panel component: ", this.state)
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
                this.props.updateImageurl(resp.data.image);
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
                <h1>Offered and requested tours!</h1>
                <div className="panel">
                    <textarea
                        type="text"
                        name=""
                        onChange={this.handleChange}
                    />
                    <br />
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
