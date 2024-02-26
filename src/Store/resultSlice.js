import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullYearResult: null,
    currMonth: null,
    liveResult: {
        waiting: [],
        upcoming: [],
        lastUpdate: null
    }
};

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setLiveResult: (state, action) => {
            state.liveResult = {
                waiting: action.payload.waiting,
                upcoming: action.payload.upcoming,
                lastUpdate: action.payload.lastUpdate
            };
        },
        setFullYearResult: (state, action) => {
            state.fullYearResult = action.payload;
        },
        setCurrMonth: (state, action) => {
            state.currMonth = action.payload;
        }

    },
});

export const { setLiveResult, setFullYearResult, setCurrMonth } = resultSlice.actions;

export default resultSlice.reducer;