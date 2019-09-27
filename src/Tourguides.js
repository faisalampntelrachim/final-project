import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Tourguides() {
    const [tour, setTour] = useState({}); //when im inserting im inserting one comment because is a string
    const [tours, setTours] = useState([]);
    // const [title, setTitle] = useState("");

    useEffect(() => {
        axios.get("/tourguides.json").then(response => {
            console.log("axios get tours is:", response.data);
            setTours(response.data);
        });
    }, [tour]);

    const handleFileChange = e => {
        setTour({
            ...tour,
            [e.target.name]: e.target.files[0]
        });
        console.log("handleFileChange in tours componenet", e.target.files[0]);
    };
    const handleChange = e => {
        console.log("handleChange in tours component:");
        e.preventDefault();
        setTour({
            ...tour,
            [e.target.name]: e.target.value
        });
        // setTitle({ [e.target.name.title]: e.target.value });
        console.log("handleChange in tours component:", e.target);
    };
    const handleClick = e => {
        e.preventDefault();
        // e.target.name.title = "";
        console.log("Something", e.target.name.title);
        console.log("handleClick in tours is working:");
        var formData = new FormData();
        console.log("resp from post/upload:", formData);
        // formData.append(" the title is", formData.name.title);
        formData.append("title", tour.title); //with this.title i access the property title
        formData.append("description", tour.description);
        formData.append("file", tour.file);
        console.log(" the formData is:", formData);

        // me.images.unshift(resp.data[0]); // unshift the image. Put it in the front of an arra

        axios
            .post("/tourguides", formData) // I want to pass a n object to the server.ts like params /tour or tours?

            .then(resp => {
                console.log(
                    "resp from post/ handlechange in tourguides component:",
                    resp
                );
                // setTitle({});
                setTour({
                    title: resp.title,
                    description: resp.description,
                    url: resp.url
                });
            })
            .catch(err => {
                console.log("err in post/tourguides handlechange:", err);
            });
    };
    return (
        <div>
            <h1>Here find all of our tourist guides!</h1>
            <div className="a">
                {tours.map(users => (
                    <div className="b" key={users.id}>
                        <img src={users.url} />
                        <h3>{users.title}</h3>
                        <h3>{users.description}</h3>
                        <button>Book a tour</button>
                    </div>
                ))}
            </div>
            <div className="anything">
                <div className="inputsTourguides">
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <input type="text" name="title" onChange={handleChange} />
                    <br />
                    <textarea name="description" onChange={handleChange} />
                    <br />
                    <button onClick={handleClick}>Submit</button>
                    <br />
                </div>
            </div>
        </div>
    );
}
