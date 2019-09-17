import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("here are my last 10 chat messages:", chatMessages);

    const keyCheck = e => {
        console.log("A key was pressed");
        console.log("e.key", e.key);
        if (e.key == "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };
    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted");
        console.log("elemRef", elemRef.current);
        console.log("scroll top", elemRef.current.scrollTop);
        console.log("scroll height is:", elemRef.current.scrollHeight);
        console.log("client height is:", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    return (
        <div className="chat">
            <h1>Chat Room!</h1>
            <div className="chat-messages" ref={elemRef}>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
