// export default function reducer(state = {}, action) {
//     //we assign a default value to state if it doesn't exist and that default value is an empty {}
//     if (action.type === "ACTION_THAT_WIL_CHANGE_A_THING") {
//         //then change redux state (immutably!)
//     }
//     if (action.type === "GET_ANIMALS") {
//         console.log("GET_ANIMALS in reducer:", action);
//         state = {
//             ...state,
//             cuteAnimals: action.cuteAnimals
//         };
//     }
//     console.log("state:", state); // i do that console.log if i dont have the dev tools
//     return state; // i must always return the state
// }

//this is the corresponding stetement in the reducer that is the same like the typr in actions.js

//with redux we skip the props etc

//we assign a default value to state if it doesn't exist and that default value is an empty {}
