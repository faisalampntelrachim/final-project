import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptFriendRequest, unfriend } from "./actions";
// const [friend, setFriend] = useState();

export default function Friends() {
    // const friendss = {
    //     if (friend == "Add friend") {
    //                 setFriend("Cancel friend");
    //     } else if (friend == "Accept friend") {
    //                 setFriend("unfriend");
    //             } else if (friend == "unfriend" || friend == "Cancel friend") {
    //                 console.log();
    //                 setFriend("unfriend")
    //             } else  {
    //                     setFriend("Add friend");
    //                 }
    // };

    const dispatch = useDispatch();
    const friends = useSelector(
        state =>
            state.friends &&
            state.friends.filter(friends => friends.friends == null)
    );

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <div id="Friends">
            <div className="friendscomponent">
                <img src={friends[0].image} />
                <div className="buttons">
                    <button
                        onClick={() => {
                            dispatch(acceptFriendRequest(friends[0].id));
                        }}
                    >
                        Add friend
                    </button>
                    <button
                        onClick={() => {
                            dispatch(unfriend(friends[0].id));
                        }}
                    >
                        Unfriend
                    </button>
                </div>
            </div>
        </div>
    );
}
