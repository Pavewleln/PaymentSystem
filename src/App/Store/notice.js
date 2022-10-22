import {createAction, createSlice} from "@reduxjs/toolkit";
import {noticeService} from "../Services/notice.service";
import {nanoid} from "nanoid";

export const noticeSlice = createSlice({
    name: "notice",
    initialState: {
        loading: true,
        entities: null,
        error: null
    },
    reducers: {
        noticeRequested: (state) => {
            state.isLoading = true;
        },
        noticeReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        noticeRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        noticeCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        deleteNotice: (state, action) => {
            state.entities = state.entities.filter(
                (n) => n._id !== action.payload
            );
        }
    }
})
const {reducer: noticeReducer, actions} = noticeSlice;
const {noticeRequested, noticeReceived, noticeRequestFailed, noticeCreated, deleteNotice} = actions;

const createNoticeRequested = createAction("notice/createNoticeRequested")
const deleteNoticeRequested = createAction("notice/deleteNoticeRequested")
const deletedCreditCardNoticeRequested = createAction("notice/deletedCreditCardNoticeRequested")
const updateUserDataRequested = createAction("notice/updateUserDataRequested")

const createNoticeFailed = createAction("notice/createNoticeFailed")
const deleteNoticeRequestFailed = createAction("notice/deleteNoticeRequestFailed")
const deletedCreditCardNoticeRequestFailed = createAction("notice/deletedCreditCardNoticeRequestFailed")
const updateUserDataRequestFailed = createAction("notice/updateUserDataRequestFailed")

export const loadNoticeList = () => async (dispatch) => {
    dispatch(noticeRequested())
    try {
        const {content} = await noticeService.get()
        dispatch(noticeReceived(content))
    } catch (error) {
        dispatch(noticeRequestFailed(error.message))
    }
}
export const createNotice = (myUserId, myMoney, recipientUserId, recipientMoney, datetime, myCardNumber, recipientCardNumber) => async (dispatch) => {
    try {
        dispatch(
            createDataNotice({
                _id: nanoid(),
                userId: myUserId,
                datetime: datetime,
                text: `С карты ${myCardNumber}, была переведена на карту ${recipientCardNumber} сумма ${myMoney}`
            }, {
                _id: nanoid(),
                userId: recipientUserId.join(''),
                datetime: datetime,
                text: `Ваша карта ${recipientCardNumber} была пополнена с карты ${myCardNumber} на сумму ${myMoney}`
            })
        );
    } catch (error) {

    }
}

function createDataNotice(myPayload, recipientPayload) {
    return async function (dispatch) {
        dispatch(createNoticeRequested());
        try {
            const {myContent} = await noticeService.myNotice(myPayload);
            dispatch(noticeCreated(myContent));
            const {recipientContent} = await noticeService.myNotice(recipientPayload);
            dispatch(noticeCreated(recipientContent));
        } catch (error) {
            dispatch(createNoticeFailed(error.message));
        }
    };
}
export const deletedCreditCardNotice = (myUserId, datetime, myCardNumber)  => async (dispatch) => {
    dispatch(deletedCreditCardNoticeRequested())
    const newDate = {
        _id: nanoid(),
        userId: myUserId,
        datetime: datetime,
        text: `Карта ${myCardNumber} была удалена с вашего аккаунта`
    }
    try{
        const {content} = await noticeService.myNotice(newDate)
        dispatch(noticeCreated(content));
    } catch (error) {
        dispatch(deletedCreditCardNoticeRequestFailed(error.message))
    }
}

export const deleteDataNotice = (noticeId) => async (dispatch) => {
    dispatch(deleteNoticeRequested())
    try {
        const {content} = await noticeService.delete(noticeId)
        if (content === null) {
            dispatch(deleteNotice(noticeId));
        }
    } catch (error) {
        dispatch(deleteNoticeRequestFailed(error.message))
    }
}
export const updateUserDataNotice = (myUserId, datetime) => async (dispatch) => {
    dispatch(updateUserDataRequested())
    const newDate = {
        _id: nanoid(),
        userId: myUserId,
        datetime: datetime,
        text: `Данные вашего аккаунта были изменены`
    }
    try {
        const {content} = await noticeService.myNotice(newDate)
        dispatch(noticeCreated(content))
    } catch (error) {
        dispatch(updateUserDataRequestFailed(error.message))
    }
}
export const getNotice = () => (state) => state.notice.entities
export const getNoticeLoadingStatus = () => (state) => state.notice.isLoading;
export default noticeReducer;