import {createAction, createSlice} from "@reduxjs/toolkit";
import {localStorageService} from "../Services/localStorage.service";
import {authService} from "../Services/auth.service";
import {GenerateAuthError} from "../Utils/generateAuthError";
import {UserService} from "../Services/user.service";
import {nanoid} from "nanoid";

const initialState = localStorageService.getAccessToken() ? {
    entities: {
        _id: null,
        dateOfBirth: null,
        description: null,
        email: null,
        followers: null,
        image: null,
        password: null,
        sex: null,
        telephone: null,
        license: false,
        location: null,
        name: null
    },
    isLoading: true,
    error: null,
    auth: {userId: localStorageService.getUserId()},
    isLoggedIn: true,
    dataLoaded: false
} : {
    entities: {
        _id: null,
        dateOfBirth: null,
        description: null,
        email: null,
        followers: null,
        image: null,
        password: null,
        sex: null,
        telephone: null,
        license: false,
        location: null,
        name: null
    },
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLogOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        updateUserSuccess: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        },
        followSuccess: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id === state.auth.userId)] = action.payload;
        },
        unfollowSuccess: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id === state.auth.userId)] = action.payload;
        }
    }
});

const {reducer: usersReducer, actions} = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLogOut,
    updateUserSuccess,
    followSuccess,
    unfollowSuccess
} = actions;

export const authRequested = createAction("users/authRequested");
const createUserRequested = createAction("users/createUserRequested");
const updateUserRequested = createAction("users/updateUserRequested");
const followRequested = createAction("users/followRequested");
const unfollowRequested = createAction("users/unfollowRequested");

const createUserFailed = createAction("users/createUserFailed");
const updateUserFailed = createAction("users/updateUserFailed");
const followRequestFailed = createAction("users/followRequestFailed");
const unfollowRequestFailed = createAction("users/unfollowRequestFailed");

export const login = (payload) => async (dispatch) => {
    const {email, password} = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({email, password});
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({userId: data.localId}));
    } catch (error) {
        const {code, message} = error.response.data.error;
        if (code === 400) {
            const errorMessage = GenerateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};
export const signUp = ({email, password, ...rest}) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({email, password});
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({userId: data.localId}));
        dispatch(
            createUser({
                _id: data.localId,
                email,
                password,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            })
        );
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
};

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(updateUserRequested());
    try {
        const {content} = await UserService.updateUserData(payload);
        dispatch(updateUserSuccess(content));
    } catch (error) {
        dispatch(updateUserFailed(error.message));
    }
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(createUserRequested());
        try {
            const {content} = await UserService.create(payload);
            dispatch(userCreated(content));
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const {content} = await UserService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};
export const follow = (id) => async (dispatch) => {
    dispatch(followRequested())
    const newData = {
        _id: nanoid(),
        follower: id
    }
    try {
        await UserService.follow(newData);
        const {content} = await UserService.getCurrentUser();
        dispatch(followSuccess(content));
    } catch (error) {
        dispatch(followRequestFailed(error.message));
    }
}
export const unfollow = (id) => async (dispatch) => {
    dispatch(unfollowRequested())
    try {
        await UserService.unfollow(id)
        const {content} = await UserService.getCurrentUser();
        dispatch(unfollowSuccess(content));
    } catch (error) {
        dispatch(unfollowRequestFailed(error.message))
    }
}

export const getUsers = () => (state) => state.users.entities;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getDataLoadingStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthError = () => (state) => state.users.error;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUsersByIds = (userIds) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userIds);
    }
};

export default usersReducer;
