import {UserInfo} from "../../Common/UserInfo/UserInfo";
import {useSelector} from "react-redux";
import {getCurrentUserId, getUsers} from "../../Store/users";
import {useState} from "react";
import {paginate} from "../../Utils/paginate";
import {Pagination} from "../../Common/UserInfo/Pagination";
import s from './Followers-Users.module.scss'
import {Table} from "react-bootstrap";
import TextField from "../../Common/form/textField";

export const Users = () => {
    const allUsersSystem = useSelector(getUsers())
    const currentUserId = useSelector(getCurrentUserId())
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [value, setValue] = useState("По имени");
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
                        value === "По имени"
                            ? user.name
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) !== -1
                            : value === "По телефону"
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
                    <h2 className={s.h3}>Пользователи</h2>
                    <div>
                        <input className={s.input} placeholder="Найти" onChange={handleSearchQuery} value={searchQuery}/>
                        <select value={value} className={s.select} onChange={changeSelect}>
                            <option>По имени</option>
                            <option>По телефону</option>
                            <option>По месту жительства</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Table>
                        <thead>
                        <tr className={"bg-light"}>
                            <th className={s.th} scope="col">Имя</th>
                            <th className={s.th} scope="col">Всего переводов</th>
                            <th className={s.th} scope="col">Место жительства</th>
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
    }
}