import httpService from "./http.service";
import {localStorageService} from "./localStorage.service";

const userEndPoint = "user/";

export const UserService = {
    get: async () => {
        const {data} = await httpService.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const {data} = await httpService.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    updateUserData: async (payload) => {
        const {data} = await httpService.patch(
            userEndPoint + localStorageService.getUserId(),
            payload
        );
        return data;
    },
    follow: async (payload) => {
        const {data} = await httpService.put(
            userEndPoint + localStorageService.getUserId() + "/followers/" + payload._id, payload
        )
        return data
    },
    unfollow: async (id) => {
        const {data} = await httpService.delete(
            userEndPoint + localStorageService.getUserId() + "/followers/" + id)
        return data
    },
    getCurrentUser: async () => {
        const {data} = await httpService.get(userEndPoint + localStorageService.getUserId())
        return data
    }
};
