import {useSelector} from "react-redux";
import {getHistory} from "../../Store/history";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {getCurrentUserId} from "../../Store/users";
import {MyCreditCardProfile} from "../Profile/MyCreditCardProfile";

export const MyExpensesAndIncome = () => {
    const history = useSelector(getHistory())
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    //Сегоднешнее число
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    //Число неделю назад
    const newDate = new Intl.DateTimeFormat().format(new Date() - 7 * 24 * 60 * 60 * 1000)
    // Число месяц назад
    const newMonthDate = new Intl.DateTimeFormat().format(new Date().setMonth(new Date().getMonth() - 1))
    if (cards && history) {
        const myCreditCards = cards.filter((p) => p.userId === currentUserId)
        const myCreditCardIds = myCreditCards.map(c => c._id)
        const historyArr = [];
        for (const his of history) {
            for (const id of myCreditCardIds) {
                if (his !== undefined) {
                    if (id === his.cardId) {
                        historyArr.push(his);
                        break;
                    }
                }
            }
        }

        const historyPaysForAllLife = historyArr.map(p => p && Number(p.pay))
        // console.log(historyPaysForAllLife)
        // Вся сумма за всю жизнь
        const historyPaysSumPositiveForAllLife = (historyPaysForAllLife.map((p) => p > 0 ? p : 0))?.reduce((a, b) => a + b)
        const historyPaysSumNegativeForAllLife = (historyPaysForAllLife.map((p) => p < 0 ? p : 0))?.reduce((a, b) => a + b)
        // console.log("За все время", historyPaysSumPositiveForAllLife, historyPaysSumNegativeForAllLife)

        // Вся сумма за сегодняшний день
        const historyForOneDay = historyArr.map((h) => h.datetime === date ? h : 0)
        const historyPaysForOneDay = historyForOneDay.map(p => p ? Number(p.pay) : 0)
        // console.log(historyPaysForOneDay)
        const historyPaysSumPositiveForOneDay = (historyPaysForOneDay.map((p) => p > 0 ? p : 0))?.reduce((a, b) => a + b)
        const historyPaysSumNegativeForOneDay = (historyPaysForOneDay.map((p) => p < 0 ? p : 0))?.reduce((a, b) => a + b)
        // console.log("За сегодняшний день", historyPaysSumPositiveForOneDay, historyPaysSumNegativeForOneDay)

        // Вся сумма за 7 дней
        const historyForSevenDays = historyArr.map((h) => h.datetime > newDate ? h : 0)
        const historyPaysForSevenDays = historyForSevenDays.map(p => p ? Number(p.pay) : 0)
        // console.log(historyForSevenDays)
        const historyPaysSumPositiveForSevenDays = (historyPaysForSevenDays.map((p) => p > 0 ? p : 0))?.reduce((a, b) => a + b)
        const historyPaysSumNegativeForSevenDays = (historyPaysForSevenDays.map((p) => p < 0 ? p : 0))?.reduce((a, b) => a + b)
        // console.log("За 7 дней", historyPaysSumPositiveForOneDay, historyPaysSumNegativeForOneDay)

        // Вся сумма за месяц
        const historyForMonth = historyArr.map((h) => h.datetime > newMonthDate ? h : 0)
        const historyPaysForMonth = historyForMonth.map(p => p ? Number(p.pay) : 0)
        // console.log(historyForSevenDays)
        const historyPaysSumPositiveForMonth = (historyPaysForMonth.map((p) => p > 0 ? p : 0))?.reduce((a, b) => a + b)
        const historyPaysSumNegativeForMonth = (historyPaysForMonth.map((p) => p < 0 ? p : 0))?.reduce((a, b) => a + b)
        // console.log("За месяц", historyPaysSumPositiveForMonth, historyPaysSumNegativeForMonth)


        // Вся сумма на определенной карте
        const historyPaysSumPositiveInMyCard = (id) => (history.map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p > 0 ? p : 0)?.reduce((a, b) => a + b)
        const historyPaysSumNegativeInMyCard = (id) => (history.map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p < 0 ? p : 0)?.reduce((a, b) => a + b)

        // Вся сумма за сегодня на определенной карте
        const historyPaysSumPositiveInMyCardForOneDay = (id) => ((history.map((h) => h.datetime === date ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p > 0 ? p : 0)?.reduce((a, b) => a + b))
        const historyPaysSumNegativeInMyCardForOneDay = (id) => ((history.map((h) => h.datetime === date ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p < 0 ? p : 0)?.reduce((a, b) => a + b))

        // Вся сумма за 7 дней на определенной карте
        const historyPaysSumPositiveInMyCardForSevenDays = (id) => ((history.map((h) => h.datetime > newDate ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p > 0 ? p : 0)?.reduce((a, b) => a + b))
        const historyPaysSumNegativeInMyCardForSevenDays = (id) => ((history.map((h) => h.datetime > newDate ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p < 0 ? p : 0)?.reduce((a, b) => a + b))

        // Вся сумма за месяц на определенной карте
        const historyPaysSumPositiveInMyCardForMonth = (id) => ((history.map((h) => h.datetime > newMonthDate ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p > 0 ? p : 0)?.reduce((a, b) => a + b))
        const historyPaysSumNegativeInMyCardForMonth = (id) => ((history.map((h) => h.datetime > newMonthDate ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p < 0 ? p : 0)?.reduce((a, b) => a + b))

        return (
            <div>
                <div className={"w-75 m-auto"}>
                    <div className={"d-flex justify-content-between"}>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Всего получено:</p>
                            <p className={"text-info"}>{historyPaysSumPositiveForAllLife}</p>
                        </div>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Всего потрачено:</p>
                            <p className={"text-info"}>{historyPaysSumNegativeForAllLife}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={"d-flex justify-content-between"}>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Получено за месяц:</p>
                            <p className={"text-info"}>{historyPaysSumPositiveForMonth}</p>
                        </div>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Потрачено за месяц:</p>
                            <p className={"text-info"}>{historyPaysSumNegativeForMonth}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={"d-flex justify-content-between"}>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Получено за 7 дней:</p>
                            <p className={"text-info"}>{historyPaysSumPositiveForSevenDays}</p>
                        </div>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Потрачено за 7 дней:</p>
                            <p className={"text-info"}>{historyPaysSumNegativeForSevenDays}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={"d-flex justify-content-between"}>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Получено за сегодня:</p>
                            <p className={"text-info"}>{historyPaysSumPositiveForOneDay}</p>
                        </div>
                        <div className={"m-2 fs-3 d-flex flex-column align-items-center"}>
                            <p>Потрачено за сегодня:</p>
                            <p className={"text-info"}>{historyPaysSumNegativeForOneDay}</p>
                        </div>
                    </div>
                </div>
                <div className={"d-flex flex-wrap justify-content-start"}>
                    {myCreditCards.map((c) => (
                        <div key={c._id} className={"m-auto fs-4 mt-5"}>
                            <MyCreditCardProfile cards={c}/>
                            <div className={"m-2"}>
                                <p>Всего получено: <span
                                    className={"text-info"}>{historyPaysSumPositiveInMyCard(c._id)}</span></p>
                            </div>
                            <div className={"m-2"}>
                                <p>Всего потрачено: <span
                                    className={"text-info"}>{historyPaysSumNegativeInMyCard(c._id)}</span></p>
                            </div>
                            <hr/>
                            <div className={"m-2"}>
                                <p>Всего получено за месяц: <span className={"text-info"}>{historyPaysSumPositiveInMyCardForMonth(c._id)}</span></p>
                            </div>
                            <div className={"m-2"}>
                                <p>Всего потрачено за месяц: <span className={"text-info"}>{historyPaysSumNegativeInMyCardForMonth(c._id)}</span></p>
                            </div>
                            <hr/>
                            <div className={"m-2"}>
                                <p>Всего получено за 7 дней: <span className={"text-info"}>{historyPaysSumPositiveInMyCardForSevenDays(c._id)}</span></p>
                            </div>
                            <div className={"m-2"}>
                                <p>Всего потрачено за 7 дней: <span className={"text-info"}>{historyPaysSumNegativeInMyCardForSevenDays(c._id)}</span></p>
                            </div>
                            <hr/>
                            <div className={"m-2"}>
                                <p>Всего получено сегодня: <span
                                    className={"text-info"}>{historyPaysSumPositiveInMyCardForOneDay(c._id)}</span></p>
                            </div>
                            <div className={"m-2"}>
                                <p>Всего потрачено сегодня: <span
                                    className={"text-info"}>{historyPaysSumNegativeInMyCardForOneDay(c._id)}</span></p>
                            </div>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}