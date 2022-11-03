import {useSelector} from "react-redux";
import {getCreditCardsList} from "../../../Store/myCreaditCard";
import {getCurrentUserId} from "../../../Store/users";
import {Link} from "react-router-dom";
import {MyCreditCards} from "../MyCreditCards/MyCreditCards";
import {useTranslation} from "react-i18next";

export const Wallet = () => {
    const {t} = useTranslation();
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    if (cards) {
        const myCreditCards = cards.filter((p) => p.userId === currentUserId)
        return myCreditCards.length !== 0 ? (
            <div>
                <MyCreditCards myCreditCards={myCreditCards}/>
            </div>
        ) : (
            <div>
                <h6>{t("youDoNotHaveCardYetDoYouWantTo")} <Link to={"/createCard"}>{t("create")}</Link>?</h6>
            </div>
        )
    } else {
        return (
            <div>
                <h6>{t("youDoNotHaveCardYetDoYouWantTo")} <Link to={"/createCard"}>{t("create")}</Link>?</h6>
            </div>
        )
    }

}