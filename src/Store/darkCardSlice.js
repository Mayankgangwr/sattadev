import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cardsData: [],
};

const darkCardSlice = createSlice({
    name: "darkCards",
    initialState,
    reducers: {
        setCards: (state, action) => {
            state.cardsData = action.payload;
        },
        
        createCard: (state, action) => {
            state.cardsData.push(action.payload);
        },

        updateCard: (state, action) => {
            if (state.cardsData.length > 0) {
                const { id, newData } = action.payload;
                const index = state.cardsData.findIndex((card) => card.id === id);
                if (index !== -1) {
                    state.cardsData[index] = { ...state[index], ...newData };
                }
            }
        },

        deleteCard: (state, action) => {
            if (state.cardsData.length > 0) {
                const index = state.cardsData.findIndex((card) => card.id === action.payload);
                if (index !== -1) {
                    state.cardsData.splice(index, 1);
                }
            }
        },
    },
});

export const { setCards, createCard, updateCard, deleteCard } = darkCardSlice.actions;

export default darkCardSlice.reducer;
