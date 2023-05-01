import {proxy} from "valtio";

const STATE = Object.freeze({
    HOME: "home",
    CART: "cart"
});

const appState = proxy({state: STATE.HOME});

export {appState, STATE};