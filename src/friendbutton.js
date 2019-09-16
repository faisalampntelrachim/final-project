import React, { useState, useEffect } from "react";
import axios from "./axios";
// import "./friendbutton.css";

export default function Friendbutton(props) {
    const [button, setButton] = useState();

    // const id = this.props.match.params.id;
    useEffect(() => {
        axios
            .get("/addfriend/" + props.id)
            .then(response => {
                console.log("response in axios get addfriend:", response);
                if (response.data.length == 0) {
                    setButton("Add friend");
                } else if (response.data[0].accepted == false) {
                    if (response.data[0].sender_id == props.id) {
                        setButton("Accept friend");
                    } else {
                        setButton("Cancel friend");
                    }
                    //check in response that accepted=false and add the condition
                    // setButton("Accept friend");
                    // } else if (response.data[0].sender_id == props.id) {
                    //     setButton("unfriend"); //unfriend
                } else {
                    // if (response.data[0].accepted == true) {
                    setButton("unfriend");
                    // }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onClick = e => {
        e.preventDefault();
        console.log("The button is:", button);
        if (button == "Add friend") {
            console.log("add friend is running");
            axios
                .post("/addfriend/" + props.id)
                .then(response => {
                    console.log("response in axios post addfriend:", response);
                    setButton("Cancel friend");
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (button == "Accept friend") {
            console.log("accept friend is running");
            axios
                .post("/acceptfriend/" + props.id)
                .then(response => {
                    console.log(
                        "response in axios post accept friend:",
                        response
                    );
                    setButton("unfriend");
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (button == "unfriend" || button == "Cancel friend") {
            console.log("unfriend  or cancel friend  is running");
            axios
                .post("/unfriend/" + props.id)
                .then(response => {
                    console.log("response from /unfriend: ", response);
                    console.log(
                        "response.data from /unfriend: ",
                        response.data
                    );
                    if (response.data.length == 0) {
                        setButton("Add friend");
                    }
                })
                .catch(function(err) {
                    console.log("error in the /cancelfriend", err);
                });
        }
    };

    return (
        <div>
            <button onClick={onClick}>{button}</button>
        </div>
    );
}
