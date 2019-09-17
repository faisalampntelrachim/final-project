import * as io from "socket.io-client";

// import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        //All our dispatches of actions will go in here...
        // socket.on("message from server", (msg) =>{
        //     console.log('GOT message from the front end and About to start redux stuff by dispatching in action');
        // }

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
