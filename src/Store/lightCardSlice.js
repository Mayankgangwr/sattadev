import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cardsData: [],
};

const lightCardSlice = createSlice({
    name: "lightCards",
    initialState,
    reducers: {
        setCards: (state, action) => {
            state.cardsData = action.payload;
        },

        createCard: (state, action) => {
            state.cardsData.push(action.payload);
        },

        updateCard: (state, action) => {
            const { id, newData } = action.payload;
            const cardIndex = state.cardsData.findIndex((card) => card.id === id);
            if (cardIndex !== -1) {
                state.cardsData[cardIndex] = { ...state.cardsData[cardIndex], ...{ id: id, cardData: newData } };
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

export const { setCards, createCard, updateCard, deleteCard } = lightCardSlice.actions;

export default lightCardSlice.reducer;
