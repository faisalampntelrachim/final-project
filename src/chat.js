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
    }, []);

    //     return (
    //         <div className="chat">
    //             <h1>Chat Room!</h1>
    //             <div className="chat-messages" ref={elemRef}>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //                 <p>Chat messages will go here</p>
    //             </div>
    //             <textarea
    //                 placeholder="Add your message here"
    //                 onKeyDown={keyCheck}
    //             />
    //         </div>
    //     );
    // }
    //     return (
    //         <div>
    //             <div className="chat-messages" ref={elemRef}>
    //                 {chatMessages &&
    //                     chatMessages.map((messages, index) => {
    //                         return (
    //                             <div className="" key={index}>
    //                                 <img src={messages.imageurl} />
    //                                 <h2>
    //                                     {" "}
    //                                     {messages.first} {messages.last}{" "}
    //                                 </h2>
    //                                 <h3> {messages.message} </h3>
    //                                 <p>
    //                                     {" "}
    //                                     {messages.posted_date} {messages.created_at}{" "}
    //                                 </p>
    //                             </div>
    //                         );
    //                     })}
    //             </div>
    //             <textarea placeholder="Add you message here" onKeyDown={keyCheck} />
    //         </div>
    //     );
    // }
    // return(
    //     <div>
    // {chatMessages &&
    //     chatMessages.map(chatMessages => {
    //     return (
    //         <div>
    //             {chatMessages &&
    //                 chatMessages.map(chatMessages => {
    //                     <div
    //                         className="chat-messages"
    //                         ref={elemRef}
    //                         key={chatMessages.id}
    //                     >
    //                         <p> chat messages will go here! </p>
    //                         <img src={chatMessages.imageurl} />
    //                         <h2>
    //                             {" "}
    //                             {chatMessages.first} {chatMessages.last}{" "}
    //                         </h2>
    //                         <h3> {chatMessages.message} </h3>
    //                         <p>
    //                             {" "}
    //                             {chatMessages.posted_date} {chatMessages.created_at}{" "}
    //                         </p>
    //                     </div>
    //                 })}
    //             <textarea placeholder="Add you message here" onKeyDown={keyCheck} />
    //         </div>
    //     );
    // }
    //     return (
    //         <div className="chat">
    //             <h1>Chat Room!</h1>
    //             <div className="chat-messages" ref={elemRef}>
    //                 {chatMessages &&
    //                     chatMessages.map(messages => {
    //                         <div className="" key={messages.sender_id}>
    //                             <img src={messages.imageurl} />
    //                             <h2>
    //                                 {" "}
    //                                 {messages.first} {messages.last}{" "}
    //                             </h2>
    //                             <h3> {messages.message} </h3>
    //                             <p>
    //                                 {" "}
    //                                 {messages.posted_date} {messages.created_at}{" "}
    //                             </p>
    //                         </div>;
    //                     })}
    //             </div>
    //             <textarea
    //                 placeholder="Add your message here"
    //                 onKeyDown={keyCheck}
    //             />
    //         </div>
    //     );
    // }
    return (
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
            <textarea placeholder="Add you message here" onKeyDown={keyCheck} />
        </div>
    );
}
