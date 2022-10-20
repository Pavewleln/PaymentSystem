import axios from "axios";

export const ratesService = {
    get: async () => {
        const {data} = await axios.get("https://api.currencyapi.com/v3/latest?apikey=NyucwSGFJmsASb3zIvg0bHi3Zz8ZJjGin9Qoglqe&currencies=BTN%2CLTC%2CBNB%2CAMD&date=2022-10-07T23:59:59")
        return data.data
    }
}