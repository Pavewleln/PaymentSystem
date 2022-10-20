import {Link} from "react-router-dom";
import {BsBell} from "@react-icons/all-files/bs/BsBell";
import profile from "../../../img/header/imageUserUndefined.jpg";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, getCurrentUserId} from "../../Store/users";
import {getNotice, getNoticeLoadingStatus, loadNoticeList} from "../../Store/notice";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {useEffect} from "react";

export const Authentication = () => {
    const currentUser = useSelector(getCurrentUserData());
    const notice = useSelector(getNotice())
    const currentUserId = useSelector(getCurrentUserId())
    const firstName = currentUser.name.split(' ').slice(0, 1).join(" ")
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    const creditCardsList = useSelector(getCreditCardsList())
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadNoticeList());
    }, [creditCardsList]);
    if (currentUser && notice) {
        const myNotice = notice.filter((n) => n !== undefined && n.userId === currentUserId)
        return (
            <div className="d-flex justify-content-between align-items-center p-3 w-100">
                <div>
                    <h4>Здравствуйте {firstName}</h4>
                    <p style={{fontSize: '14px'}}>Сегодня {date}</p>
                </div>
                <div className={"d-flex"}>
                    <Link to={"/notice"}
                          className={"bg-white rounded-3 d-flex align-items-center justify-content-center position-relative"}
                          style={{width: '50px', height: '50px', marginRight: '50px'}}>
                        <BsBell/>
                        {myNotice.length > 0 && <div className={"position-absolute"} style={{
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            width: '5px',
                            height: '5px',
                            top: '15px',
                            left: '30px'
                        }}></div>}
                    </Link>
                    <div className={"d-flex align-items-center"}>
                        <h6 style={{marginRight: '10px'}}>{firstName}</h6>
                        <Link to={"/profile"} className={"rounded-3 overflow-hidden"}
                              style={{width: '50px', height: '50px'}}>
                            <img style={{width: '100%', height: '100%'}}
                                 src={currentUser.image ? currentUser.image : profile}/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="d-flex justify-content-between align-items-center p-3 w-100">
                <div>
                    <h4>Здравствуйте {firstName}</h4>
                    <p style={{fontSize: '14px'}}>Сегодня {date}</p>
                </div>
                <div className={"d-flex"}>
                    <div className={"d-flex align-items-center"}>
                        <h6 style={{marginRight: '10px'}}>{firstName}</h6>
                        <Link to={"/profile"} className={"rounded-3 overflow-hidden"}
                              style={{width: '50px', height: '50px'}}>
                            <img style={{width: '100%', height: '100%'}}
                                 src={currentUser.image ? currentUser.image : profile}/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}