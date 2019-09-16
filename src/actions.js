import axios from "./axios";

export function receiveFriendsWannabes() {
    axios.get("/friends-wannabes").then(({ data }) => {
        console.log("friends-wannabes:", data);
        return {
            type: "RECEIVE_FRIENDS_WANNABES",
            id: data
        };
    });
}

export function acceptFriendRequest() {
    axios.post("/acceptfriend").then(({ data }) => {
        console.log("accept friend:", data);
        return {
            type: "ACCEPT_FRIEND_REQUEST"
        };
    });
}
export function unfriend() {
    axios.post("/unfriend").then(({ data }) => {
        console.log("unfriend:", data);
        return {
            type: "UNFRIEND"
        };
    });
}
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
