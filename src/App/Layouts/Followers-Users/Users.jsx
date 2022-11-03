import {UserInfo} from "../../Common/UserInfo/UserInfo";
import {useSelector} from "react-redux";
import {getCurrentUserId, getUsers} from "../../Store/users";
import {useState} from "react";
import {paginate} from "../../Utils/paginate";
import {Pagination} from "../../Common/UserInfo/Pagination";
import s from './Followers-Users.module.scss'
import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const Users = () => {
    const {t} = useTranslation();
    const allUsersSystem = useSelector(getUsers())
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
    if (allUsersSystem) {
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

        const usersCrop = filterUsers(allUsersSystem)
        const users = paginate(usersCrop, currentPage, pageSize);
        const count = allUsersSystem.length;
        return (
            <div className={s.users}>
                <div className={s.usersTitle}>
                    <h2 className={s.h3}>{t("users")}</h2>
                    <div>
                        <input className={s.input} placeholder={t("search")} onChange={handleSearchQuery}
                               value={searchQuery}/>
                        <select value={value} className={s.select} onChange={changeSelect}>
                            <option>{t("byTheName")}</option>
                            <option>{t("byPhone")}</option>
                            <option>{t("atThePlaceOfResidence")}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Table>
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
                            Всего пользователей <b>{count}</b>
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
                {t("noUsersAtTheMoment")}
            </div>
        )
    }
}