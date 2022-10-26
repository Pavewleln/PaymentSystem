import logo from "../../../img/header/imageUserUndefined.jpg";
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../../Store/users";
import {FollowedUser} from "./FollowedUser";
import s from './UserInfo.module.scss'
import {Link} from "react-router-dom";

export const UserInfo = ({p}) => {
    const currentUserData = useSelector(getCurrentUserData())
    const firstName = p.name.split(' ').slice(0, 1).join(" ")
    const secondName = p.name.split(' ').slice(1, 2).join(" ")
    if (currentUserData) {
        return (
            <tbody key={p._id}>
            <tr className={s.tr}>
                <td className={s.profileInfo}>
                    <img className={s.image} src={p.image ? p.image : logo}/>
                    <div className={s.profileDescription}>
                        <div>
                            <p className={s.name}>{firstName}</p>
                            <p className={s.name}>{secondName}</p>
                        </div>
                        <p className={s.telephone}>{p.telephone}</p>
                    </div>
                </td>
                <td className={s.td}>{p.transfer ? p.transfer : "Нет переводов"}</td>
                <td className={s.td}>
                    {p.location}
                </td>
                <td className={s.td}>
                    <Link to={`/transact/${p._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-send" viewBox="0 0 16 16">
                            <path
                                d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                    </Link>
                </td>
                <td className={s.td}>
                    <FollowedUser currentUserData={currentUserData} p={p}/>
                </td>
            </tr>
            </tbody>
        )
    }
}