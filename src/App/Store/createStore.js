import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ratesReducer from "./rates";
import historyReducer from "./history";
import usersReducer from "./users";
import cardsReducer from "./myCreaditCard";
import noticeReducer from "./notice";

const rootReducer = combineReducers({rates: ratesReducer, history: historyReducer, users: usersReducer, cards: cardsReducer, notice: noticeReducer})
export const createStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production"
    });
}
