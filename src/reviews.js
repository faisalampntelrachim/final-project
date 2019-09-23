import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Reviews() {
    const [reviews, setReviews] = useState(""); //when im inserting im insering one comment because is a string
    const [rev, setRev] = useState([]);
    useEffect(() => {
        axios.get("/reviews").then(response => {
            console.log("axios get reviews is:", response.data);
            setRev(response.data);
        });
    }, []);

    const handleChange = e => {
        setReviews(e.target.value);
        console.log("handleChange in reviews component:", e.target.value);
    };
    const handleClick = e => {
        e.preventDefault();

        console.log("handleClick in reviews is working:");
        axios
            .post("/reviews", reviews)
            .then(resp => {
                console.log("resp from post/ handlechange:", resp);
            })
            .catch(err => {
                console.log("err in post/panel handlechange:", err);
            });
    };

    return (
        <div>
            {rev.map(users => (
                <div key={users.id}>
                    <div className="panel">
                        <h1>
                            Please tell us about your experience in the tours!
                        </h1>
                        <textarea type="text" name="" onChange={handleChange} />
                        <br />
                        <button onClick={handleClick}>Save</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

// {reviews.map(users => (
//     <div key={users.id}>
