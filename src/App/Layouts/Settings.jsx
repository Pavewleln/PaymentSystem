import {useTranslation} from "react-i18next";
import i18n from "../../i18n";
import {UseLocalstorage} from "../../Hooks/use-localstorage";

export const Settings = () => {
    const {t} = useTranslation();
    const [language, setLanguage] = UseLocalstorage('language', 'ru')
    const handleLanguageChange = () => {
        if(language === "en") {
            i18n.changeLanguage('ru');
            setLanguage('ru')
        } else {
            if(language === "ru"){
                i18n.changeLanguage('en');
                setLanguage('en')
            }
        }
    }
    return (
        <>
            <button onClick={handleLanguageChange}>Изменить язык</button>
            <div>{t("text")}</div>
        </>
    )
}