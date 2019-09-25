import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Offers() {
    const [tour, setTour] = useState({}); //when im inserting im inserting one comment because is a string
    const [tours, setTours] = useState([]);
    useEffect(() => {
        // axios.get("/tours.json").then(response => {
        //     console.log("axios get tours is:", response.data);
        //     setTours(response.data);
        // });
    }, []);

    const handleFileChange = e => {
        setTour({
            ...tour,
            [e.target.name]: e.target.files[0]
            // [e.target.name]: e.target.files[0]
        });
        console.log("handleFileChange in tours componenet", e.target.files[0]);
    };
    const handleChange = e => {
        console.log("handleChange in tours component:");
        e.preventDefault();
        setTour({
            ...tour,
            [e.target.name]: e.target.value[0]
        });
        console.log("handleChange in tours component:", e.target.value);
    };
    const handleClick = e => {
        e.preventDefault();
        // e.target.value = "";
        console.log("handleClick in tours is working:");
        var formData = new FormData();
        console.log("resp from post/upload:", formData);
        // formData.append(" the title is", formData.name.title);
        formData.append("the title is:", formData.name.title); //with this.title i access the property title
        formData.append("the description is:", formData.name.description);
        formData.append("the file is:", formData.name.file);
        // console.log("formData", formData);

        // me.images.unshift(resp.data[0]); // unshift the image. Put it in the front of an arra

        axios
            .post("/tours", tours) // I want to pass a n object to the server.ts like params /tour or tours?

            .then(resp => {
                console.log(
                    "resp from post/ handlechange in tours component:",
                    resp
                );
                setTours({
                    title: resp.title,
                    description: resp.description,
                    url: resp.url
                });
            })
            .catch(err => {
                console.log("err in post/tours handlechange:", err);
            });
    };
    return (
        <div>
            <div className="something">
                <h1>Here find all of our tours!</h1>
                {tours.map(users => (
                    <div className="tours" key={users.id}>
                        <h3>{users.url}</h3>
                        <h3>{users.title}</h3>
                        <h3>{users.description}</h3>
                    </div>
                ))}
                <input
                    type="file"
                    name="name"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleClick}>Upload</button>
                <input
                    type="description"
                    name="description"
                    onChange={handleChange}
                />
                <br />
                <textarea type="text" name="" onChange={handleChange} />
                <button onClick={handleClick}>Submit</button>
                <br />
            </div>
        </div>
    );
}
// const handleClick = e => {
//     e.preventDefault();
//     console.log("");
//     var formData = new FormData();
//     axios
//         .post("/offers", formData)
//         .then(function(resp) {
//             console.log("resp from post/upload:", resp);
//
//             formData.append("title", resp.title); //with this.title i access the property title
//             formData.append("description", resp.description);
//             formData.append("username", resp.username);
//             formData.append("file", resp.file);
//             console.log("formData", formData);
//
//             // me.images.unshift(resp.data[0]); // unshift the image. Put it in the front of an array
//         })
//         .catch(function(err) {
//             console.log("err in post/tours:", err);
//         });
