import {useSelector} from "react-redux";
import {getHistory} from "../../../Store/history";
import BNB from "../../../../img/BNB.png";
import ETM from "../../../../img/ETM.png";
import LTC from "../../../../img/LTM.png";
import BTN from "../../../../img/BTN.png";
import _ from "lodash";
import s from './HistoryInfo.module.scss'
import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const HistoryInfo = ({historyCardForId}) => {
    const {t} = useTranslation();
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
                <Table>
                    <thead>
                    <tr className={"bg-light"}>
                        <th scope="col"></th>
                        <th className={"text-center"} scope="col">{t("sendersCurrency")}</th>
                        <th className={"text-center"} scope="col">{t("data")}</th>
                        <th className={"text-center"} scope="col">{t("transferAmount")}</th>
                    </tr>
                    </thead>
                    {sortedHistory.map((h) => (
                        <tbody key={h._id} className={s.tbody}>
                        <tr>
                            <td>
                                <img className={s.image}
                                     src={(h.shortName === "BNB" ? BNB : h.shortName === "AMD" ? ETM : h.shortName === "LTC" ? LTC : BTN)}/>
                            </td>
                            <td>
                                <p className={s.rate}>{h.shortName}</p>
                                </td>
                            <td>
                                <p className={s.datetime}>{h.datetime}</p>
                            </td>
                            <td>
                                <p className={s.pay}>{h.pay}</p>
                            </td>
                        </tr>
                        </tbody>))}
                </Table>
            </div>
        ) : (
            <div>
                <p>
                    {t("noHistory")}
                </p>
            </div>
        )
    } else {
        if (history === null) {
            return (<div>
                <p>
                    {t("noHistory")}
                </p>
            </div>)
        }
    }
}