import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
import axios from "axios";

export default function FindUsers() {
    const [search, setSearch] = useState(""); //1st is the state and 2nd the function to set the state
    const [users, setUsers] = useState([]);

    // to find only 3
    // useEffect(() => {
    //     axios.get("/findusers").then(response => {
    //         console.log("response.data:", response.data);
    //         setUsers(response.data);
    //     });
    // })();

    useEffect(() => {
        axios
            .get("/findusers")
            .then(response => {
                console.log("response.data:", response);
                setUsers(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    //to find all of those  users
    // useEffect(() => {
    //     // its like componentdidmount
    //     let ignore = false;
    //     async () => {
    //         const { data } = await axios
    //             .get("/findusers/" + search)
    //             .then(response => {
    //                 if (!ignore) {
    //                     setSearch(response.data);
    //                     // console.log(
    //                     //     "axios get findusers with params.id:",
    //                     //     response.data
    //                     // );
    //                 }
    //             })();
    //         return () => {
    //             ignore = true;
    //         };
    //     },
    //         [search];
    // })();

    const onChange = e => {
        setUsers(e.target.value);
    };
    const onClick = e => {
        setUsers(e.target.value);
    };
    // const onSearchClick = e => setUsers(e.target.value);

    return (
        <div>
            <h1>Find People</h1>
            <input onChange={onChange} defaultValue={users} />
            <button onClick={onClick}> Search</button>
            <div>
                <ul>
                    {users.map(users => (
                        <div key={users.id}>
                            <li>
                                <img src={users.imageurl} />
                                <h2>
                                    {users.first} {users.last}
                                </h2>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}
