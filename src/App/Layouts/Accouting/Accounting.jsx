import {CreditCardsLoader} from "../../Hoc/creditCardsLoader";
import {HistoryLoader} from "../../Hoc/historyLoader";
import {MyExpensesAndIncome} from "./MyExpensesAndIncome";

export const Accounting = () => {
    return (
        <HistoryLoader>
            <CreditCardsLoader>
                <MyExpensesAndIncome/>
            </CreditCardsLoader>
        </HistoryLoader>
    )
}