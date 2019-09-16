export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        console.log("add friends is running");
        state = {
            ...state,
            receiveFriendsWannabes: action.receiveFriendsWannabes
            // users: action.users
        };
        // friendsWannabes: [state],
        // receiveFriendsWannabes: action.receiveFriendsWannabes
    }
    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        console.log("accept friend is running");
        // state = {
        //     ...state,
        //     users: state.users.map(
        //         user => {
        //             if (user.id != action.id) {
        //                 return user;
        //             } else {
        //                 return {
        //                     ...user,
        //                     hot: action.type == 'MAKE_HOT'
        //                 };
        //             }
        //         }
        //     )
        // };
        // state = {
        //     ...state,
        //     acceptFriendRequest: action.acceptFriendRequest
        // };
    }

    if (action.type === "UNFRIEND") {
        console.log("unfriend is running");
        console.log();
        // state = {
        //     ...friends,
        //     unfriend: action.unfriend
        // };
    }
}
