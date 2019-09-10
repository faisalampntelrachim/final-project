import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
// import { Route } from "react-router-dom";

export default function Profile({ first, imageurl, last, setBio, bio }) {
    return (
        <div className="profilepic">
            <h1>
                Hey!
                {first} {last}
            </h1>
            <ProfilePic first={first} last={last} imageurl={imageurl} />
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}

// function ProfilePic({id,size,imageurl}){
//     if(id)
// }
// return <img src={url} width={size=='xl' ? 500:50}

// export default function Profile({ profilepic, first, last, bio, image, id }) {
//     const elem = <h1>hi!</h1>;
//     return (
//         <div>
//             <h1>
//                 {first} {last}
//             </h1>
//             <ProfilePic
//                 first={first}
//                 imageurl={imageurl}
//                 lats={last}
//                 size="xl"
//             />
//             <BioEditor bio={bio} setBio={setBio} />
//         </div>
//     );
// }
