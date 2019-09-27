import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Reviews() {
    const [reviews, setReviews] = useState(""); //when im inserting im insering one comment because is a string
    const [rev, setRev] = useState([]);
    useEffect(() => {
        axios.get("/reviews.json").then(response => {
            console.log("axios get reviews is:", response.data);
            setRev(response.data);
        });
    }, [reviews]);

    const handleChange = e => {
        setReviews(e.target.value);
        console.log("handleChange in reviews component:", e.target.value);
    };
    const handleClick = e => {
        e.preventDefault();
        // e.target.value = "";
        console.log("handleClick in reviews is working:", reviews);
        axios
            .post("/reviews", { comment: reviews }) // I want to pass a n object to the server.ts like params
            .then(resp => {
                setReviews(""); // keeping track of the text field
                // e.target.value = "";
                setRev([...rev, resp.data]); //keeping track of the array or comments
                console.log("resp from post/ handlechange:", resp.data);
                console.log("");
            })
            .catch(err => {
                console.log("err in post/reviews handlechange:", err);
            });
    };

    return (
        <div>
            <h1>Please tell us about your experience in the tours!</h1>

            <div className="panel">
                {rev.map(users => (
                    <div className="cards" key={users.id}>
                        <h3>{users.comment}</h3>
                        <span>☆</span>
                        <span>☆</span>
                        <span>☆</span>
                        <span>☆</span>
                        <span>☆</span>
                    </div>
                ))}
            </div>
            <div className="review-textarea">
                <textarea
                    type="text"
                    name=""
                    onChange={handleChange}
                    value={reviews}
                />
                <br />
                <button onClick={handleClick}>Save</button>
            </div>
        </div>
    );
}
//<div className="review-textarea">
// {rev.map(users => (
//     <div className="cards" key={users.id}>
//         <h3>{users.comment}</h3>
//     </div>
// ))}
// {reviews.map(users => (
//     <div key={users.id}>

// {rev.map(users => (
//     <div key={users.id}>
