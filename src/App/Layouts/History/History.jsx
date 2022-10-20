import {MyHistory} from "./MyHistory";
import {HistoryLoader} from "../../Hoc/historyLoader";
import {CreditCardsLoader} from "../../Hoc/creditCardsLoader";

export const History = () => {
    return (
        <HistoryLoader>
            <CreditCardsLoader>
                <MyHistory/>
            </CreditCardsLoader>
        </HistoryLoader>
    )
}