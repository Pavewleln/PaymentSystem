import {useSelector} from "react-redux";
import {getHistory} from "../../Store/history";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {getCurrentUserId} from "../../Store/users";
import {Link} from "react-router-dom";
import {HistoryLoader} from "../../Hoc/historyLoader";
import BNB from "../../../img/BNB.png";
import ETM from "../../../img/ETM.png";
import LTC from "../../../img/LTM.png";
import BTN from "../../../img/BTN.png";
import {Table} from "react-bootstrap";
import {useState} from "react";
import _ from "lodash";

export const MyHistory = () => {
    const history = useSelector(getHistory())
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value);
    };
    if (cards && history) {
        const myCreditCards = cards.filter((p) => p.userId === currentUserId)
        const myCreditCardIds = myCreditCards.map(c => c._id)
        const historyArr = [];
        for (const his of history) {
            for (const id of myCreditCardIds) {
                if(his !== undefined) {
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
                    (user) => user.datetime
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
                ["desc"]
            )
        }
        const sortedUsers = handleSort()
        return (
            <div className={" p-4 bg-white rounded-4 m-3"}>
                <div className={"d-flex align-items-center m-2"}>
                    <h3>История</h3>
                    <input className={"bg-white border rounded-3 m-2"}
                           style={{
                               paddingLeft: '20px',
                               paddingTop: '12px',
                               paddingRight: '150px',
                               paddingBottom: '12px'
                           }}
                           placeholder="Поиск по дате" onChange={handleSearchQuery} value={searchQuery}/>
                </div>
                <Table>
                    <thead>
                    <tr className={"bg-light"}>
                        <th scope="col"></th>
                        <th scope="col" className={"text-center"}>Карта отправителя</th>
                        <th scope="col" className={"text-center"}>Карта получателя</th>
                        <th scope="col" className={"text-center"}>Валюта</th>
                        <th scope="col" className={"text-center"}>Дата</th>
                        <th scope="col" className={"text-center"}>Сумма перевода</th>
                        <th scope="col" className={"text-center"}>Статус</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <HistoryLoader>
                        {sortedUsers
                            ? sortedUsers.map(h => h !== undefined && (
                                <tbody key={h._id} className="m-2">
                                <tr>
                                    <td className={"text-center"}>
                                        <img
                                            src={(h.shortName === "BNB" ? BNB : h.shortName === "AMD" ? ETM : h.shortName === "LTC" ? LTC : BTN)}/>
                                    </td>
                                    <td className={"text-center"}>
                                        <p style={{color: '#707EAE'}}>{h.numberCardSender}</p>
                                    </td>
                                    <td className={"text-center"}>
                                        <p style={{color: '#707EAE'}}>{h.numberCardRecipient}</p>
                                    </td>
                                    <td className={"text-center"}>
                                        <p style={{color: '#707EAE'}}>{h.rate}</p>
                                    </td>
                                    <td className={"text-center"}>
                                        <p style={{color: '#707EAE'}}>{h.datetime}</p>
                                    </td>
                                    <td className={"text-center"}>
                                        <p style={{color: '#707EAE'}}>{h.pay}</p>
                                    </td>
                                    <td className={"text-center"}>
                                        <p className={h.status === "completed" ? "text-success" : "text-danger"}>{h.status}</p>
                                    </td>
                                </tr>
                                </tbody>
                            ))
                            : "Нет истории"
                        }
                    </HistoryLoader>
                </Table>
            </div>
        )
    } else {
        return "Нет истории"
    }
}