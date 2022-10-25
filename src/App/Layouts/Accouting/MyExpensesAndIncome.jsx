import {useSelector} from "react-redux";
import {getHistory} from "../../Store/history";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {getCurrentUserId} from "../../Store/users";
import {MyCreditCardProfile} from "../Profile/MyCreditCardProfile/MyCreditCardProfile";
import s from './Accounting.module.scss'

export const MyExpensesAndIncome = () => {
    const history = useSelector(getHistory())
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    //Сегоднешнее число
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    //Число неделю назад
    const newDate = new Intl.DateTimeFormat().format(new Date() - 7 * 24 * 60 * 60 * 1000)
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
        if(!historyPaysForAllLife || historyPaysForAllLife.length === 0) return "У вас нет ни одного перевода"
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

        // Вся сумма на определенной карте
        const historyPaysSumPositiveInMyCard = (id) => (history.map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p > 0 ? p : 0)?.reduce((a, b) => a + b)
        const historyPaysSumNegativeInMyCard = (id) => (history.map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p < 0 ? p : 0)?.reduce((a, b) => a + b)

        // Вся сумма за сегодня на определенной карте
        const historyPaysSumPositiveInMyCardForOneDay = (id) => ((history.map((h) => h.datetime === date ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p > 0 ? p : 0)?.reduce((a, b) => a + b))
        const historyPaysSumNegativeInMyCardForOneDay = (id) => ((history.map((h) => h.datetime === date ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p < 0 ? p : 0)?.reduce((a, b) => a + b))

        // Вся сумма за 7 дней на определенной карте
        const historyPaysSumPositiveInMyCardForSevenDays = (id) => ((history.map((h) => h.datetime > newDate ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p > 0 ? p : 0)?.reduce((a, b) => a + b))
        const historyPaysSumNegativeInMyCardForSevenDays = (id) => ((history.map((h) => h.datetime > newDate ? h : 0).map((h) => h.cardId === id ? Number(h.pay) : 0)).map((p) => p < 0 ? p : 0)?.reduce((a, b) => a + b))

        return (
            <div className={s.accounting}>
                <div className={s.allPayment}>
                    <div className={s.payments}>
                        <div className={s.sum}>
                            <p className={s.title}>Всего получено:</p>
                            <p className={s.text}>{historyPaysSumPositiveForAllLife}</p>
                        </div>
                        <div className={s.sum}>
                            <p className={s.title}>Всего потрачено:</p>
                            <p className={s.text}>{historyPaysSumNegativeForAllLife}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={s.payments}>
                        <div className={s.sum}>
                            <p className={s.title}>Получено за 7 дней:</p>
                            <p className={s.text}>{historyPaysSumPositiveForSevenDays}</p>
                        </div>
                        <div className={s.sum}>
                            <p className={s.title}>Потрачено за 7 дней:</p>
                            <p className={s.text}>{historyPaysSumNegativeForSevenDays}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={s.payments}>
                        <div className={s.sum}>
                            <p className={s.title}>Получено за сегодня:</p>
                            <p className={s.text}>{historyPaysSumPositiveForOneDay}</p>
                        </div>
                        <div className={s.sum}>
                            <p className={s.title}>Потрачено за сегодня:</p>
                            <p className={s.text}>{historyPaysSumNegativeForOneDay}</p>
                        </div>
                    </div>
                </div>
                <div className={s.paymentInMyCard}>
                    {myCreditCards.map((c) => (
                        <div className={s.card} key={c._id}>
                            <MyCreditCardProfile cards={c}/>
                            <div className={s.sumCard}>
                                <p>Всего получено: <span className={s.text}>{historyPaysSumPositiveInMyCard(c._id)}</span></p>
                            </div>
                            <div className={s.sumCard}>
                                <p>Всего потрачено: <span className={s.text}>{historyPaysSumNegativeInMyCard(c._id)}</span></p>
                            </div>
                            <hr/>
                            <div className={s.sumCard}>
                                <p>Всего получено за 7 дней: <span className={s.text}>{historyPaysSumPositiveInMyCardForSevenDays(c._id)}</span></p>
                            </div>
                            <div className={s.sumCard}>
                                <p>Всего потрачено за 7 дней: <span className={s.text}>{historyPaysSumNegativeInMyCardForSevenDays(c._id)}</span></p>
                            </div>
                            <hr/>
                            <div className={s.sumCard}>
                                <p>Всего получено сегодня: <span className={s.text}>{historyPaysSumPositiveInMyCardForOneDay(c._id)}</span></p>
                            </div>
                            <div className={s.sumCard}>
                                <p>Всего потрачено сегодня: <span className={s.text}>{historyPaysSumNegativeInMyCardForOneDay(c._id)}</span></p>
                            </div>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}