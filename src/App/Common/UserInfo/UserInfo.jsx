import logo from "../../../img/header/imageUserUndefined.jpg";
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../../Store/users";
import {FollowedUser} from "./FollowedUser";
import s from './UserInfo.module.scss'

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
                    <FollowedUser currentUserData={currentUserData} p={p}/>
                </td>
            </tr>
            </tbody>
        )
    }
}