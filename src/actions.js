import axios from "./axios";

// export function example() {
//     return {
//         // the object that returns is the action and must have at least one property and that is type.
//         type: "ACTION_THAT_WIL_CHANGE_A_THING"
//     };
// }

export function getCuteAnimals() {
    axios.get("cute-animals.json").then(({ data }) => {
        console.log("data:", data);
        return {
            type: "GET_ANIMALS",
            cuteAnimals: data
        };
    });
}
