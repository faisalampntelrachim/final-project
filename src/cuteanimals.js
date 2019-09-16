import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCuteAnimals } from "./actions";

export default function CuteAnimals() {
    const dispatch = useDispatch();
    const cuteAnimals = useSelector(state => state.cuteAnimals);
    console.log("cuteAnimals", cuteAnimals);

    // {
    //     console.log("state:", state);
    //     return state.cuteAnimals;
    // });

    useEffect(() => {
        dispatch(getCuteAnimals());
    }, []);

    return (
        <div>
            <h1>cute animals :)</h1>
            {cuteAnimals &&
                cuteAnimals.map((animal, index) => {
                    return <p key={index}>{animal.name}</p>;
                })}
        </div>
    );
}

// key is to identify elements. we can pass as a key whatever we want
