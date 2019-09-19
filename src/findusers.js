import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
import axios from "axios";

export default function FindUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(""); //1st is the state and 2nd the function to set the state

    // to find only 3
    useEffect(() => {
        axios
            .get("/findusers")
            .then(response => {
                console.log("response.data:", response.data);
                setUsers(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // its like componentdidmount
    //to find all of those  users
    useEffect(() => {
        console.log("Use effect running");
        console.log("about to make axios request");
        axios
            .get("/findusers/" + search)
            // + search
            .then(response => {
                let ignore = false;
                console.log("resp from useEffect in find users:", response);
                if (!ignore) {
                    setUsers(response.data);
                    // console.log(
                    //     "axios get findusers with params.id:",
                    //     response.data
                    // );
                } else {
                    console.log("ignored");
                }
            });
        // let ignore = false;
    }, [search]);

    const onChange = e => {
        setSearch(e.target.value);
    };
    const onSearchClick = e => {
        setSearch(e.target.value);
    };
    // const onSearchClick = e => setUsers(e.target.value);

    return (
        <div>
            <h1>Find Users</h1>
            <input onChange={onChange} defaultValue={search} />

            <div>
                <ul>
                    {users.map(users => (
                        <div key={users.id}>
                            <li>
                                <img src={users.imageurl} />
                                <h3>
                                    {users.first} {users.last}
                                </h3>
                                <h3>{users.bio}</h3>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

//this is under the input
// <button onClick={onSearchClick}> Search</button>
