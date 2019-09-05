import React from "react";

export default function Profilepic(props) {
    console.log("imageurl:", props.imageurl);
    let imageurl = props.imageurl || "/img/socialnetwork.jpg";
    console.log("image after: ||", props.imageurl);
    return (
        <div>
            <h2>
                I am the presentational component. My name is:{props.first}{" "}
                {props.last}
            </h2>
            <img onClick={props.showModal} src={imageurl} />
        </div>
    );
}
