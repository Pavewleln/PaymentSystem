import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logOut} from "../../Store/users";
import {useTranslation} from "react-i18next";

export const Logout = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, [])
    return (
        <div>
            {t("logout")}
        </div>
    )
}