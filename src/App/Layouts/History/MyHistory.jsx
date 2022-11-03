import {useSelector} from "react-redux";
import {getHistory} from "../../Store/history";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {getCurrentUserId} from "../../Store/users";
import {HistoryLoader} from "../../Hoc/historyLoader";
import BNB from "../../../img/BNB.png";
import ETM from "../../../img/ETM.png";
import LTC from "../../../img/LTM.png";
import BTN from "../../../img/BTN.png";
import {Table} from "react-bootstrap";
import {useState} from "react";
import _ from "lodash";
import s from './History.module.css'
import {useTranslation} from "react-i18next";

export const MyHistory = () => {
    const {t} = useTranslation();
    const history = useSelector(getHistory())
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    const [value, setValue] = useState("По дате");
    const [searchQuery, setSearchQuery] = useState("");
    const changeSelect = ({target}) => {
        setValue(target.value);
        setSearchQuery('')
    }

    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value);
    };
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

        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                    (user) =>
                        value === "По дате"
                            ? user.datetime
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) !== -1
                            : value === "По номеру отправителя"
                                ? user.numberCardSender
                                .toLowerCase()
                                .indexOf(searchQuery.toLowerCase()) !== -1
                                : user.numberCardRecipient.toString()
                                .toLowerCase()
                                .indexOf(searchQuery.toLowerCase()) !== -1
                )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUserId);
        }

        const usersCrop = filterUsers(historyArr)
        const handleSort = () => {
            return _.orderBy(
                usersCrop,
                ["datetime"],
                ["asc"]
            )
        }
        const sortedUsers = handleSort()
        return (
            <div className={s.history}>
                <div className={s.historyTitle}>
                    <h3 className={s.h3}>{t("history")}</h3>
                    <div>
                        <input className={s.input} placeholder={t("search")} onChange={handleSearchQuery}
                               value={searchQuery}/>
                        <select value={value} className={s.select} onChange={changeSelect}>
                            <option>{t("byDate")}</option>
                            <option>{t("bySenderNumber")}</option>
                            <option>{t("byRecipientNumber")}</option>
                        </select>
                    </div>
                </div>
                <Table className={s.table}>
                    <thead>
                    <tr className={"bg-light"}>
                        <th className={s.th1} scope="col"></th>
                        <th className={"text-center"} scope="col">{t("senderCard")}</th>
                        <th className={"text-center"} scope="col">{t("recipientCard")}</th>
                        <th className={"text-center"} scope="col">{t("sendersCurrency")}</th>
                        <th className={"text-center"} scope="col">{t("date")}</th>
                        <th className={"text-center"} scope="col">{t("transferAmount")}</th>
                    </tr>
                    </thead>
                    <HistoryLoader>
                        {sortedUsers
                            ? sortedUsers.map(h => h !== undefined && (
                                <tbody className={s.tbody} key={h._id}>
                                <tr>
                                    <td className={s.td1}>
                                        <img className={s.img}
                                             src={(h.shortName === "BNB" ? BNB : h.shortName === "AMD" ? ETM : h.shortName === "LTC" ? LTC : BTN)}/>
                                    </td>
                                    <td>
                                        <p className={s.p}>{h.numberCardSender}</p>
                                    </td>
                                    <td>
                                        <p className={s.p}>{h.numberCardRecipient}</p>
                                    </td>
                                    <td>
                                        <p className={s.p}>{h.shortName}</p>
                                    </td>
                                    <td>
                                        <p className={s.p}>{h.datetime}</p>
                                    </td>
                                    <td>
                                        <p className={s.p}>{h.pay}</p>
                                    </td>
                                </tr>
                                </tbody>
                            ))
                            : t("noHistory")
                        }
                    </HistoryLoader>
                </Table>
            </div>
        )
    } else {
        return t("noHistory")
    }
}