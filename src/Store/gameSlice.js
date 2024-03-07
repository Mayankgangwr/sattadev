import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gamesData: [],
};

const gameSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        setGames: (state, action) => {
            state.gamesData = action.payload;
        },

        createGame: (state, action) => {
            state.gamesData.push(action.payload);
        },

        updateGame: (state, action) => {
            if (state.gamesData.length > 0) {
                const { id, newData } = action.payload;
                const index = state.gamesData.findIndex((card) => card.id === id);
                if (index !== -1) {
                    state.gamesData[index] = { ...state.gamesData[index], ...newData };
                }
            }
        },

        deleteGame: (state, action) => {
            if (state.gamesData.length > 0) {
                const index = state.gamesData.findIndex((card) => card.id === action.payload);
                if (index !== -1) {
                    state.gamesData.splice(index, 1);
                }
            }
        },
    },
});

export const { setGames, createGame, updateGame, deleteGame } = gameSlice.actions;

export default gameSlice.reducer;
