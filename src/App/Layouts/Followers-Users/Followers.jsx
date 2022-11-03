import {useSelector} from "react-redux";
import {getCurrentUserData, getCurrentUserId, getUsers} from "../../Store/users";
import {useState} from "react";
import {paginate} from "../../Utils/paginate";
import {Pagination} from "../../Common/UserInfo/Pagination";
import {UserInfo} from "../../Common/UserInfo/UserInfo";
import s from './Followers-Users.module.scss'
import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const Followers = () => {
    const {t} = useTranslation();
    const allUsersSystem = useSelector(getUsers())
    const currentUserData = useSelector(getCurrentUserData())
    const currentUserId = useSelector(getCurrentUserId())
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [value, setValue] = useState(t("byTheName"));
    const pageSize = 5;
    const changeSelect = ({target}) => {
        setValue(target.value);
        setSearchQuery('')
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value);
    };
    if (currentUserData && currentUserData.followers) {
        const followers = Object.values(currentUserData.followers)
        const usersArr = [];
        for (const user of allUsersSystem) {
            for (const follower of followers) {
                if (user._id === follower.follower) {
                    usersArr.push(user);
                    break;
                }
            }
        }

        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                    (user) =>
                        value === t("byTheName")
                            ? user.name
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) !== -1
                            : value === t("byPhone")
                                ? user.telephone
                                .toLowerCase()
                                .indexOf(searchQuery.toLowerCase()) !== -1
                                : user.location
                                .toLowerCase()
                                .indexOf(searchQuery.toLowerCase()) !== -1
                )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUserId);
        }

        const usersCrop = filterUsers(usersArr)
        const users = paginate(usersCrop, currentPage, pageSize);
        const count = followers.length;
        return (
            <div className={s.users}>
                <div className={s.usersTitle}>
                    <h2 className={s.h3}>{t("followers")}</h2>
                    <div>
                        <input className={s.input} placeholder={t("search")} onChange={handleSearchQuery} value={searchQuery}/>
                        <select value={value}  className={s.select} onChange={changeSelect}>
                            <option>{t("byTheName")}</option>
                            <option>{t("byPhone")}</option>
                            <option>{t("atThePlaceOfResidence")}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Table className="table table-hover bg-white rounded-4">
                        <thead>
                        <tr className={"bg-light"}>
                            <th scope="col" className={s.th} >{t("name")}</th>
                            <th scope="col" className={s.th} >{t("totalTransfers")}</th>
                            <th scope="col" className={s.th} >{t("placeOfResidence")}</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        {users.map((p) => (
                            <UserInfo key={p._id} p={p}/>
                        ))}
                    </Table>
                    <div className={s.paginator}>
                        <p className={s.allUsers}>
                            Всего друзей <b>{count}</b>
                        </p>
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {t("youHaveNoFriendsAtTheMoment")}
            </div>
        )
    }
}