export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        console.log("add friends is running");
        state = {
            ...state,
            friends: action.friends
            // users: action.friends
        };
        // friendsWannabes: [state],
        // receiveFriendsWannabes: action.receiveFriendsWannabes
    }
    console.log("accept friend is running");
    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        console.log("accept friend is running");
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                } else {
                    return {
                        ...user,
                        accepted: true
                    };
                }
            })
        };
        // state = {
        //     ...state,
        //     acceptFriendRequest: action.acceptFriendRequest
        // };
    }
    console.log("unfriend is running");
    if (action.type === "UNFRIEND") {
        console.log("unfriend is running");
        console.log("the state is:", state);
        state = {
            ...state,
            friends: action.friends.filter(friends => friends.accepted == false)
        };
        // state = {
        //     ...state,
        //     users: state.users.filter(users => {
        //         ...state,
        //         accepted: true;
        //     })
        // };
    }
    // state.currentCategoryId===menu.category_id
    // state ={}
    //     state.friends &&
    //     state.friends.filter(friends => friends.accepted == false)
    // }
    console.log("the state is:", state);
    return state;
}
