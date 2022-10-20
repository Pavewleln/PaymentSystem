import { createSlice } from "@reduxjs/toolkit";
import {ratesService} from "../Services/rates.service";

const ratesSlice = createSlice({
    name: "rates",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        ratesRequested: (state) => {
            state.isLoading = true;
        },
        ratesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        ratesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: ratesReducer, actions } = ratesSlice;
const { ratesRequested, ratesReceived, ratesRequestFailed } = actions;

export const loadRatesList = () => async (dispatch) => {
        dispatch(ratesRequested());
        try {
            const content = await ratesService.get();
            dispatch(ratesReceived(content));
        } catch (error) {
            dispatch(ratesRequestFailed(error.message));
        }
};

export const getRates = () => (state) => state.rates.entities;
export const getRatesLoadingStatus = () => (state) => state.rates.isLoading;
export const getRatesByIds = (ratesIds) => (state) => {
    if (state.rates.entities) {
        return state.rates.entities.find((p) => p._id === ratesIds);
    } else {
        return [];
    }
};

export default ratesReducer;
