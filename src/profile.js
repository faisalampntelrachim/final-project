// import React from "react";

export default function Profile({ profilepic, first, last, bio, image, id }) {
    const elem = <h1>hi!</h1>;
    return (
        <div>
            <h1>
                {first} {last}
            </h1>
            // <ProfilePic
            //     first={first}
            //     imageurl={imageurl}
            //     lats={last}
            //     size="xl"
            // />
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}

// function ProfilePic({id,size,imageurl}){
//     if(id)
// }
// return <img src={url} width={size=='xl' ? 500:50}
