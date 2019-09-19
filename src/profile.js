import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
// import { Route } from "react-router-dom";

export default function Profile({
    first,
    imageurl,
    last,
    setBio,
    bio,
    showModal
}) {
    return (
        <div className="profilepic">
            <h1>Hey!</h1>
            <h1>
                {first} {last}
            </h1>
            <ProfilePic
                first={first}
                last={last}
                imageurl={imageurl}
                showModal={showModal}
            />
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
