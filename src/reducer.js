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
            friends: state.friends.map(user => {
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
    }
    console.log("unfriend is running");
    if (action.type === "UNFRIEND") {
        console.log("unfriend is running");
        console.log("the state is:", state);
        state = {
            ...state,
            friends: state.friends.filter(friends => friends.id != action.id)
        };
    }

    //////////////////to get 10 last messages
    console.log("GET_LAST_TEN_MESSAGES in reducer is running");
    if (action.type === "GET_LAST_TEN_MESSAGES") {
        console.log("reducer for 10 messages  is running");
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    /////////////////////// to update the state and get new messages
    console.log("GET_NEW_MESSAGES in reducer is running");
    if (action.type === "GET_NEW_MESSAGES") {
        console.log("reducer for chat  is running");
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage[0]] // i can't add an array inside an array thats why is chatMessage[0]
        };
        // friendsWannabes: [state],
        // receiveFriendsWannabes: action.receiveFriendsWannabes
    }
    console.log("the state is:", state);
    return state;
}
