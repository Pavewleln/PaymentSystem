import axios from "axios";
import { localStorageService } from "./localStorage.service";

const httpAuth = axios.create();

export const authService = {
    register: async ({ email, password }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJbi7WEvSudQPRTaRS8hjuFuwGhbpAmlg`;
        const { data } = await httpAuth.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, password }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJbi7WEvSudQPRTaRS8hjuFuwGhbpAmlg`;
        const { data } = await httpAuth.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const url = `https://securetoken.googleapis.com/v1/token?key=AIzaSyAJbi7WEvSudQPRTaRS8hjuFuwGhbpAmlg`;
        const { data } = await httpAuth.post(url, {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};
