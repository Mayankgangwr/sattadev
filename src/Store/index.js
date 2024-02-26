import { login, logout } from "./authSlice";
import { setCards as setDarkCards, createCard as createDarkCard, updateCard as updateDarkCard, deleteCard as deleteDarkCard } from "./darkCardSlice";
import { setCards as setLightCards, createCard as createLightCard, updateCard as updateLightCard, deleteCard as deleteLightCard } from "./lightCardSlice";
import { setLiveResult, setFullYearResult, setCurrMonth } from "./resultSlice";
import { setGames, createGame, updateGame, deleteGame } from "./gameSlice";

export {
    login, logout,
    setDarkCards, createDarkCard, updateDarkCard, deleteDarkCard,
    setLightCards, createLightCard, updateLightCard, deleteLightCard,
    setLiveResult, setFullYearResult, setCurrMonth,
    setGames, createGame, updateGame, deleteGame
};