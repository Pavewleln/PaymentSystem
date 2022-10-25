import {useSelector} from "react-redux";
import {getCurrentUserData, getCurrentUserId, getUsers} from "../Store/users";
import {useState} from "react";
import {paginate} from "../Utils/paginate";
import {Pagination} from "../Common/Pagination";
import {UserInfo} from "../Common/UserInfo";

export const Followers = () => {
    const allUsersSystem = useSelector(getUsers())
    const currentUserData = useSelector(getCurrentUserData())
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

        const usersCrop = filterUsers(usersArr)
        const users = paginate(usersCrop, currentPage, pageSize);
        const count = followers.length;
        return (
            <div className={"bg-white m-4 p-4 rounded-4"}>
                <div className={"d-flex"}>
                    <h2 className={"m-2"}>Друзья</h2>
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
                            <th scope="col" className={"text-center"}>Всего завершенных</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        {users.map((p) => (
                            <UserInfo key={p._id} p={p}/>
                        ))}
                    </table>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <p>
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
                В данный момент у вас нет друзей
            </div>
        )
    }
}