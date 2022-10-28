import {useSelector} from "react-redux";
import {getHistory} from "../../../Store/history";
import BNB from "../../../../img/BNB.png";
import ETM from "../../../../img/ETM.png";
import LTC from "../../../../img/LTM.png";
import BTN from "../../../../img/BTN.png";
import _ from "lodash";
import s from './HistoryInfo.module.scss'

export const HistoryInfo = ({historyCardForId}) => {
    const history = useSelector(getHistory())
    if (history) {
        const historyCard = history.filter((h) => h !== undefined && h.cardId === historyCardForId)
        const handleSort = () => {
            return _.orderBy(
                historyCard,
                ["datetime"],
                ["desc"]
            )
        }
        const sortedHistory = handleSort()
        return sortedHistory.length !== 0 ? (
            <div className={s.historyInfo}>
                {sortedHistory.map((h) => (
                    <div key={h._id} className={s.historyBlock}>
                        <img className={s.image} src={(h.shortName.join(' ') === "BNB" ? BNB : h.shortName.join(' ') === "AMD" ? ETM : h.shortName.join(' ') === "LTC" ? LTC : BTN)}/>
                        <p className={s.rate}>{h.shortName}</p>
                        <p className={s.datetime}>{h.datetime}</p>
                        <p className={s.pay}>{h.pay}</p>
                    </div>))}
            </div>
        ) : (
            <div>
                <p>
                    Нет истории
                </p>
            </div>
        )
    } else {
        if (history === null) {
            return (<div>
                <p>
                    Нет истории
                </p>
            </div>)
        }
    }
}