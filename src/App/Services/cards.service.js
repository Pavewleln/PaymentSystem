import httpService from "./http.service";
const creditCardsEndPoint = "creditCards/"
const banksName = "banks/"
export const cardsService = {
    get: async () => {
        const {data} = await httpService.get(creditCardsEndPoint)
        return data;
    },
    getBanks: async () => {
        const {data} = await httpService.get(banksName)
        return data;
    },
    createNewCard: async (newCard) => {
        const {data} = await httpService.put(creditCardsEndPoint + newCard._id, newCard)
        return data;
    },
    removeCard: async (cardId) => {
        const {data} = await httpService.delete(creditCardsEndPoint + cardId)
        return data;
    },
    removeMyMoney: async (myCardId, myMoney) => {
        const data = await httpService.put(creditCardsEndPoint + myCardId + "/amountOfMoney/", myMoney)
        return data.config.data
    },
    addRecipientMoney: async (recipientCardId, recipientMoney) => {
        const {data} = await httpService.put(creditCardsEndPoint + recipientCardId + "/amountOfMoney/", recipientMoney)
        return data.config.data
    }
}