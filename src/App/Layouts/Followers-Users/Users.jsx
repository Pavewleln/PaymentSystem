import {UserInfo} from "../Common/UserInfo";
import {useSelector} from "react-redux";
import {getCurrentUserId, getUsers} from "../Store/users";
import {useState} from "react";
import {paginate} from "../Utils/paginate";
import {Pagination} from "../Common/Pagination";

export const Users = () => {
    const allUsersSystem = useSelector(getUsers())
    const currentUserId = useSelector(getCurrentUserId())
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [value, setValue] = useState("По имени");
    const pageSize = 3;
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
            <div className={"bg-white m-4 p-4 rounded-4"}>
                <div className={"d-flex"}>
                    <h2 className={"m-2"}>Пользователи</h2>
                    <div className={"d-flex"}>
                        <input className={"bg-white border rounded-3 m-2"}
                               style={{
                                   paddingLeft: '20px',
                                   paddingTop: '12px',
                                   paddingRight: '150px',
                                   paddingBottom: '12px'
                               }}
                               placeholder="Найти" onChange={handleSearchQuery} value={searchQuery}/>
                        <select value={value} className={"bg-white border rounded-3 m-2"}
                                style={{
                                    paddingLeft: '20px',
                                    paddingTop: '3px',
                                    paddingRight: '10px',
                                    paddingBottom: '3px'
                                }} onChange={changeSelect}>
                            <option>По имени</option>
                            <option>По телефону</option>
                            <option>По месту жительства</option>
                        </select>
                    </div>
                </div>
                <div>
                    <table className="table table-hover bg-white rounded-4">
                        <thead>
                        <tr className={"bg-light"}>
                            <th scope="col" className={"text-center"}>Имя</th>
                            <th scope="col" className={"text-center"}>Всего переводов</th>
                            <th scope="col" className={"text-center"}>Место жительства</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        {users.map((p) => (
                            <UserInfo key={p._id} p={p}/>
                        ))}
                    </table>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <p>
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