import axios from "./axios";

export async function receiveFriendsWannabes() {
    console.log("actions receive Friends is working");
    const { data } = await axios.get("/friends-wannabes");
    console.log("the data is:", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friends: data
    };
}
export async function acceptFriendRequest(id) {
    console.log("actions acceptFriends  is working");
    const { data } = await axios.post("/acceptfriend/" + id);
    console.log("accept friend:", data);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id
    };
}
export async function unfriend(id) {
    console.log("actions unfriend  is working");
    const { data } = await axios.post("/unfriend/" + id);
    console.log("unfriend:", data);
    return {
        type: "UNFRIEND",
        id
    };
}

//to get the 10 messages
export function chatMessages(msgs) {
    console.log("chat messages  is working");
    console.log("The msgs in actions is:", msgs);
    return {
        type: "GET_LAST_TEN_MESSAGES",
        chatMessages: msgs
    };
}

//to get the new message
export function chatMessage(msg) {
    console.log("chat messages  is working");
    console.log("The msg in actions is:", msg);
    return {
        type: "GET_NEW_MESSAGES",
        chatMessage: msg
    };
}
// export function chatMessage(msg) {
//     console.log("chat messages  is working");
//     console.log("msgs:", msgs);
//     return {
//         type: "GET_LAST_TEN_MESSAGES",
//         chatMessages: msgs
//     };
// }
// export function example() {
//     return {
//         // the object that returns is the action and must have at least one property and that is type.
//         type: "ACTION_THAT_WIL_CHANGE_A_THING"
//     };
// }

// export function getCuteAnimals() {
//     axios.get("cute-animals.json").then(({ data }) => {
//         console.log("data:", data);
//         return {
//             type: "GET_ANIMALS",
//             cuteAnimals: data
//         };
//     });
// }
