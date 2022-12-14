import {Link} from "react-router-dom";
import {BsBell} from "@react-icons/all-files/bs/BsBell";
import profile from "../../../img/header/imageUserUndefined.jpg";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, getCurrentUserId} from "../../Store/users";
import {getNotice, getNoticeLoadingStatus, loadNoticeList} from "../../Store/notice";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {useEffect} from "react";
import s from './Header.module.scss'
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";

export const Authentication = ({handleLanguageChange}) => {
    const {t} = useTranslation();
    const currentUser = useSelector(getCurrentUserData());
    const notice = useSelector(getNotice())
    const currentUserId = useSelector(getCurrentUserId())
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    const creditCardsList = useSelector(getCreditCardsList())
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadNoticeList());
    }, [creditCardsList]);
    if (currentUser) {
        const firstName = currentUser.name.split(' ').slice(0, 1).join(" ")
        return (
            <div className={s.authentication}>
                <div>
                    <h4 className={s.h4}>{t("welcome")} {firstName}</h4>
                    <p className={s.date}>{t("date")} {date}</p>
                </div>
                <div className={s.authenticationRight}>
                    <Button style={{marginRight: '20px'}} onClick={handleLanguageChange}>{t("language")}</Button>
                    <Link to={"/notice"} className={s.notice}>
                        <BsBell/>
                        {notice &&
                        notice.filter((n) => n !== undefined && n.userId === currentUserId).map((n) => n.datetime === date ? n.datetime : null).join(" ").length > 0
                            ? <div className={s.noticeLength}></div>
                            : null
                        }
                    </Link>
                    <div className={s.profileName}>
                        <Link to={"/profile"} className={s.profile}>
                            <img className={s.image} src={currentUser.image ? currentUser.image : profile}/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="d-flex justify-content-between align-items-center p-3 w-100">
                <div>
                    <h4>{t("welcome")}</h4>
                    <p style={{fontSize: '14px'}}>{t("date")} {date}</p>
                </div>
                <div className={"d-flex"}>
                    <Button style={{marginRight: '20px'}} onClick={handleLanguageChange}>{t("language")}</Button>
                    <div className={"d-flex align-items-center"}>
                        <Link to={"/profile"} className={"rounded-3 overflow-hidden"}
                              style={{width: '50px', height: '50px'}}>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}