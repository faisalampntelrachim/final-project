import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend
} from "./actions"; //acceptFriendRequest, unfriend
// const [friend, setFriend] = useState();

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        state =>
            state.friends &&
            state.friends.filter(friends => friends.accepted == true)
    );
    const wannabes = useSelector(
        state =>
            state.friends &&
            state.friends.filter(friends => friends.accepted == false)
    );
    console.log("friends", friends);
    console.log("wannnabes", wannabes);
    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <div id="Friends">
            <div className="friendscomponent">
                <h1>These people want to be your friends</h1>
                <ul>
                    {friends &&
                        friends.map(users => (
                            <div key={users.id}>
                                <li>
                                    <img src={users.imageurl} />
                                    <h3>
                                        {users.first} {users.last}
                                    </h3>
                                </li>
                                <button
                                    onClick={() => {
                                        dispatch(unfriend(users.id));
                                    }}
                                >
                                    unfriend
                                </button>
                            </div>
                        ))}
                </ul>
                <div>
                    <h1>Pending friend requests</h1>
                    <ul>
                        {wannabes &&
                            wannabes.map(users => (
                                <div key={users.id}>
                                    <li>
                                        <img src={users.imageurl} />
                                        <h3>
                                            {users.first} {users.last}
                                        </h3>
                                        <h3>{users.bio}</h3>
                                        <button
                                            onClick={() => {
                                                dispatch(
                                                    acceptFriendRequest(
                                                        users.id
                                                    )
                                                );
                                            }}
                                        >
                                            Add friend
                                        </button>
                                    </li>
                                </div>
                            ))}
                    </ul>
                </div>
                <img src={friends.imageurl} />
            </div>
        </div>
    );
}
// <div id="Friends">
//     <div className="friendscomponent">
//         <h1>These people want to be your friends</h1>
//         <img src={friends[0].image} />
//         <div className="buttons">
//             <button
//                 onClick={() => {
//                     dispatch(acceptFriendRequest(friends[0].id));
//                 }}
//             >
//                 Add friend
//             </button>
//             <button
//                 onClick={() => {
//                     dispatch(unfriend(friends[0].id));
//                 }}
//             >
//                 Unfriend
//             </button>
//         </div>
//     </div>
// </div>
