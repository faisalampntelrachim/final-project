import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        //All our dispatches of actions will go in here...
        // socket.on("message from server", (msg) =>{
        //     console.log('GOT message from the front end and About to start redux stuff by dispatching in action');
        // }

        socket.on("ten messages from server", (
            msgs //1st argument must be the same like the io.sockets.emit in index.js
        ) => store.dispatch(chatMessages(msgs)));

        socket.on("new chat message", msg => {
            console.log("The msg in socket is:", msg);
            store.dispatch(chatMessage(msg));
            // console.log("The msg in socket is:", msg);
        });
    }
};
