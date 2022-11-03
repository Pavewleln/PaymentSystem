import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const Completed = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    return (
        <div>
            <h1>{t("actionCompletedSuccessfully")}</h1>
            <Button onClick={() => navigate("/home")}>{t("goBackToTheMainPage")}</Button>
        </div>
    )
}