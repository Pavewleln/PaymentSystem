import {createAction, createSlice} from "@reduxjs/toolkit";
import {cardsService} from "../Services/cards.service";
import {nanoid} from "nanoid";
import {getCurrentUserId} from "./users";
import {randomInt} from "../Utils/randomInt";
import {useNavigate} from "react-router";

const cardsSlice = createSlice({
    name: "myCreditCards",
    initialState: {
        entities: null,
        isLoading: false,
        error: null,
        banks: null
    },
    reducers: {
        cardsRequested: (state) => {
            state.isLoading = true;
        },
        cardsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        banksReceived: (state, action) => {
            state.banks = action.payload;
            state.isLoading = false;
        },
        cardsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createNewCardSuccess: (state, action) => {
            state.entities.push(action.payload);
        },
        removeCardSuccess: (state, action) => {
            state.entities = state.entities.filter((p) => p._id !== action.payload)
        },
        removeMyCardSum: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id == action.payload.myCardId)] = action.payload.myContent;
        },
        addMyCardSum: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id == action.payload.recipientCardId)] = action.payload.recipientContent;
        }
    }
})

const {reducer: cardsReducer, actions} = cardsSlice;
const {
    cardsRequested, cardsReceived, cardsRequestFailed, createNewCardSuccess, removeCardSuccess, banksReceived, removeMyCardSum, addMyCardSum
} = actions

const createNewCardRequested = createAction("/createdPosts/createNewCardRequested")
const removeCardRequested = createAction("/createdPosts/removeCardRequested")
const banksRequested = createAction("/createdPosts/banksRequested")
const translateMoneyRequested = createAction("/createdPosts/translateMoneyRequested")
const translateMoneySuccess = createAction("/createdPosts/translateMoneySuccess")

const createNewCardRequestFailed = createAction("/createdPosts/createNewCardRequestFailed")
const removeCardFailed = createAction("/createdPosts/removeCardFailed")
const banksRequestFailed = createAction("/createdPosts/banksRequestFailed")
const translateMoneyRequestFailed = createAction("/createdPosts/translateMoneyRequestFailed")

export const loadBanksNameList = () => async (dispatch) => {
    dispatch(banksRequested())
    try {
        const {content} = await cardsService.getBanks()
        dispatch(banksReceived(content))
    } catch (error) {
        dispatch(banksRequestFailed(error.message))
    }
}

export const loadCardsList = () => async (dispatch) => {
    dispatch(cardsRequested())
    try {
        const {content} = await cardsService.get()
        dispatch(cardsReceived(content))
    } catch (error) {
        dispatch(cardsRequestFailed(error.message))
    }
}

export const TranslateMoney = (myCardId, myMoney, recipientCardId, recipientMoney) => async (dispatch) => {
    dispatch(translateMoneyRequested())
    try {
        const myContent = await cardsService.removeMyMoney(myCardId, myMoney)
        const {recipientContent} = await cardsService.addRecipientMoney(recipientCardId, recipientMoney)
        dispatch(removeMyCardSum({myCardId, myContent}))
        dispatch(addMyCardSum({recipientCardId, recipientContent}))
        dispatch(translateMoneySuccess())
    } catch (error) {
        dispatch(translateMoneyRequestFailed(error.message))
    }
}

export const createNewCard = (data, authorName) => async (dispatch, getState) => {
    const dateCreated = (new Date().toLocaleString().split(",").slice(0, 1).join(' ')).split('.').slice(0, 2).join('/')
    const newCard = {
        _id: nanoid(),
        amountOfMoney: 500,
        authorName: authorName,
        bank: data.bank,
        created_at: Date.now(),
        dateOfCreation: dateCreated,
        numberCard: randomInt(2000000000000000, 5000000000000000),
        userId: getCurrentUserId()(getState()),
        cvv: randomInt(100, 999)
    }
    dispatch(createNewCardRequested())
    try {
        const {content} = await cardsService.createNewCard(newCard)
        dispatch(createNewCardSuccess(content))
    } catch (error) {
        dispatch(createNewCardRequestFailed(error.message))
    }
}

export const removeCard = (cardId) => async (dispatch) => {
    dispatch(removeCardRequested())
    try {
        const {content} = await cardsService.removeCard(cardId)
        if (content === null) {
            dispatch(removeCardSuccess(cardId))
        }
    } catch (error) {
        dispatch(removeCardFailed(error.message))
    }
}

export const getCardBankNameByIds = (cardId) => (state) => {
    if (state.cards.entities) {
        return state.cards.entities.find((p) => p._id === cardId)
    }
}
export const getCreditCardsList = () => (state) => state.cards.entities
export const getCreditCardsLoadingStatus = () => (state) => state.cards.isLoading
export const getAllBanksList = () => (state) => state.cards.banks

export default cardsReducer;