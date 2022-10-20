import httpService from "./http.service";

const noticeEndPoint = "notice/";

export const noticeService = {
    get: async () => {
        const {data} = await httpService.get(noticeEndPoint);
        return data
    },
    myNotice: async (payload) => {
        const {data} = await httpService.put(noticeEndPoint + payload._id, payload)
        return data;
    },
    delete: async (noticeId) => {
        const {data} = await httpService.delete(noticeEndPoint + noticeId)
        return data
    }
}