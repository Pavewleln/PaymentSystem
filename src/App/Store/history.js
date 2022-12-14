import {createAction, createSlice} from "@reduxjs/toolkit";
import {historyService} from "../Services/history.service";
import {nanoid} from "nanoid";

const historySlice = createSlice({
    name: "history",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        historyRequested: (state) => {
            state.isLoading = true;
        },
        historyReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        historyRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        HistoryCreated: (state, action) => {
            state.entities.push(action.payload);
        }
    }
});

const {reducer: historyReducer, actions} = historySlice;
const {historyRequested, historyReceived, historyRequestFailed, HistoryCreated} = actions;

const createHistoryRequested = createAction('history/createHistoryRequested')
const createHistoryFailed = createAction('history/createHistoryFailed')

export const loadHistoryList = () => async (dispatch) => {
    dispatch(historyRequested());
    try {
        const {content} = await historyService.get();
        dispatch(historyReceived(content));
    } catch (error) {
        dispatch(historyRequestFailed(error.message));
    }
};

export const createHistory = (myCardId, myMoney, recipientCardId, recipientMoney, datetime, myCardNumber, recipientCardNumber, myCardCurrency) => async (dispatch) => {
    try {
        dispatch(
            createDataHistory(
                {
                    _id: nanoid(),
                    cardId: myCardId.join(''),
                    datetime: datetime,
                    pay: `-${myMoney}`,
                    shortName: myCardCurrency.join(''),
                    rate: myCardCurrency == "BTN"
                        ? "Bitcoin"
                        : myCardCurrency == "AMD"
                            ? "Armenian dram"
                            : myCardCurrency == "BNB"
                                ? "Binance Coin"
                                : "Litecoin",
                    status: 'completed',
                    numberCardSender: myCardNumber.join(''),
                    numberCardRecipient: recipientCardNumber.toString()
                },
                {
                    _id: nanoid(),
                    cardId: recipientCardId.join(''),
                    datetime: datetime,
                    pay: `+${recipientMoney}`,
                    shortName: myCardCurrency.join(''),
                    rate: myCardCurrency == "BTN"
                        ? "Bitcoin"
                        : myCardCurrency == "AMD"
                            ? "Armenian dram"
                            : myCardCurrency == "BNB"
                                ? "Binance Coin"
                                : "Litecoin",
                    status: 'completed',
                    numberCardSender: myCardNumber.join(''),
                    numberCardRecipient: recipientCardNumber.toString()
                })
        );
    } catch (error) {

    }
}

function createDataHistory(myPayload, recipientPayload) {
    return async function (dispatch) {
        dispatch(createHistoryRequested());
        try {
            const {myContent} = await historyService.historyCard(myPayload);
            dispatch(HistoryCreated(myContent));
            const {recipientContent} = await historyService.historyCard(recipientPayload);
            dispatch(HistoryCreated(recipientContent));
        } catch (error) {
            dispatch(createHistoryFailed(error.message));
        }
    };
}

export const getHistory = () => (state) => state.history.entities;
export const getHistoryLoadingStatus = () => (state) => state.history.isLoading;
export const getHistoryByIds = (historyIds) => (state) => {
    if (state.history.entities) {
        return state.history.entities.find((p) => p.cardId === historyIds);
    } else {
        return [];
    }
};

export default historyReducer;
