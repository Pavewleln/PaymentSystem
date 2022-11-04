import profile from '../../../img/header/imageUserUndefined.jpg'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../Store/users";
import {Authentication} from "./Authentication";
import s from './Header.module.scss'
import {useTranslation} from "react-i18next";
import {UseLocalstorage} from "../../../Hooks/use-localstorage";
import i18n from "../../../i18n";
import {Button} from "react-bootstrap";

export const Header = () => {
    const {t} = useTranslation();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const [language, setLanguage] = UseLocalstorage('language', 'ru')
    const handleLanguageChange = () => {
        if (language === "en") {
            i18n.changeLanguage('ru');
            setLanguage('ru')
        } else {
            if (language === "ru") {
                i18n.changeLanguage('en');
                setLanguage('en')
            }
        }
    }
    return (
        <>
            {isLoggedIn
                ? <Authentication handleLanguageChange={handleLanguageChange}/>
                : (
                    <div className={s.header}>
                        <Button style={{marginRight: '20px'}} onClick={handleLanguageChange}>{t("language")}</Button>
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