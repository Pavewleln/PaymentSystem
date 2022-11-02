import profile from '../../../img/header/imageUserUndefined.jpg'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../Store/users";
import {Authentication} from "./Authentication";
import s from './Header.module.scss'
import {useTranslation} from "react-i18next";

export const Header = () => {
    const {t} = useTranslation();
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <>
            {isLoggedIn
                ? <Authentication/>
                : (
                    <div className={s.header}>
                        <div className={s.login}>
                            <h5 className={s.h5}>{t("signInToContinue")}</h5>
                            <Link to={"/profile"} className={s.profile}>
                                <img className={s.image} src={profile}/>
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}