import {useSelector} from "react-redux";
import {getHistory} from "../../Store/history";
import BNB from "../../../img/BNB.png";
import ETM from "../../../img/ETM.png";
import LTC from "../../../img/LTM.png";
import BTN from "../../../img/BTN.png";
import _ from "lodash";

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
        return sortedHistory.length !== 0 ? (<div className={"overflow-auto"} style={{height: '300px'}}>
                {sortedHistory.map((h) => (
                    <div key={h._id} className="d-flex justify-content-between align-items-center m-2">
                        <img
                            src={(h.shortName === "BNB" ? BNB : h.shortName === "AMD" ? ETM : h.shortName === "LTC" ? LTC : BTN)}/>
                        <p style={{color: '#707EAE'}}>{h.rate}</p>
                        <p style={{color: '#707EAE'}}>{h.datetime}</p>
                        <p style={{color: '#707EAE'}}>{h.pay}</p>
                        <p className={h.status === "completed" ? "text-success" : "text-danger"}>{h.status}</p>
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