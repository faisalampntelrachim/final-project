import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("here are my last 10 chat messages:", chatMessages);

    const keyCheck = e => {
        console.log("A key was pressed");
        console.log("The e.key is:", e.key);
        if (e.key == "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("chat message", e.target.value);
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
        <div className="main-chat">
            <div className="chat-messages" ref={elemRef}>
                <h1> Chat Room </h1>
                {chatMessages &&
                    chatMessages.map((messages, index) => {
                        return (
                            <div className="chat" key={index}>
                                <h3>
                                    <img src={messages.imageurl} />
                                    {messages.first} {messages.last}
                                </h3>
                                <p>{messages.message}</p>
                                <p>{messages.created_at}</p>
                            </div>
                        );
                    })}
                <textarea
                    placeholder="Add you message here"
                    onKeyDown={keyCheck}
                />
            </div>
        </div>
    );
}
