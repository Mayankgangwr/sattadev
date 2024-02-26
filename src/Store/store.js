import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import darkCardSlice from "./darkCardSlice";
import lightCardSlice from "./lightCardSlice";
import gameSlice from "./gameSlice";
import resultSlice from "./resultSlice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        darkCards: darkCardSlice,
        lightCards: lightCardSlice,
        games: gameSlice,
        result: resultSlice,
    },
    devTools: true,
});
export default store;