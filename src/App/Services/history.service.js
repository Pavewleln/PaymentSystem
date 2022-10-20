import httpService from "./http.service";

const historyEndPoint = "history/"

export const historyService = {
    get: async () => {
        const {data} = await httpService.get(historyEndPoint);
        return data;
    },
    historyCard: async (payload) => {
        const {data} = await httpService.put(historyEndPoint + payload._id, payload)
        return data;
    }
}