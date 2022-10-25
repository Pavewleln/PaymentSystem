import logo from "../../img/header/imageUserUndefined.jpg";
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../Store/users";
import {FollowedUser} from "./FollowedUser";

export const UserInfo = ({p}) => {
    const currentUserData = useSelector(getCurrentUserData())
    if (currentUserData) {
        return (
            <tbody key={p._id}>
            <tr>
                <td className={"d-flex text-center"}>
                    <img className={"m-2"} style={{
                        width: '40px', height: '40px', borderRadius: '50%', lineHeight: '0', margin: '2px'
                    }} src={p.image ? p.image : logo}/>
                    <div style={{marginTop: '10px'}}>
                        <p style={{fontSize: '12px', fontWeight: '500', lineHeight: '0'}}>{p.name}</p>
                        <p style={{fontSize: '12px'}}>{p.telephone}</p>
                    </div>
                </td>
                <td className={"text-center"}>{p.transfer ? p.transfer : "Нет переводов"}</td>
                <td className={"text-center"} style={{fontSize: '12px', width: '140px'}}>
                    {p.location}
                </td>
                <td className={"text-center"}>
                    <FollowedUser currentUserData={currentUserData} p={p}/>
                </td>
            </tr>
            </tbody>
        )
    }
}