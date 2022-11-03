import imageUserUndefined from "../../../img/header/imageUserUndefined.jpg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCurrentUserData, getCurrentUserId} from "../../Store/users";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {MyCreditCardProfile} from "./MyCreditCardProfile/MyCreditCardProfile";
import {AiOutlineSetting} from "@react-icons/all-files/ai/AiOutlineSetting";
import s from './Profile.module.scss'
import {useTranslation} from "react-i18next";

export const ProfileInfo = () => {
    const {t} = useTranslation();
    const currentUser = useSelector(getCurrentUserData());
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    return currentUser && cards ? (
        <div className={s.profile}>
            <div className={s.profileInfo}>
                <Link className={s.update} to={`/profile/${currentUserId}/edit`}><AiOutlineSetting/></Link>
                <div className={s.prof}>
                    <div className={s.profileTop}>
                        <div className={s.profileImage}>
                            <img className={s.image} src={currentUser.image ? currentUser.image : imageUserUndefined}/>
                        </div>
                        <div>
                            <h3>{currentUser.name}</h3>
                        </div>
                    </div>
                    <div className={s.profileBottom}>
                        <p>{t("placeOfResidence")}: {currentUser.location}</p>
                        <p>{t("dateOfBirth")}: {currentUser.dateOfBirth}</p>
                        <p>{t("phoneNumber")}: {currentUser.telephone}</p>
                        <p>{t("sex")}: {currentUser.sex === "male" ? t("male") : currentUser.sex === "female" ? t("female") : t("other")}</p>
                        <p>{t("description")}: {currentUser.description}</p>
                    </div>
                    <Link to={'/logout'} className={s.logout}>{t("signOut")}</Link>
                </div>
                {cards.filter((p) => p.userId === currentUserId).length !== 0
                    ? (
                        <div className={s.cards}>
                            {(cards.filter((p) => p.userId === currentUserId)).map((c) => (
                                <Link key={c._id} to={`/profile/${c._id}`}><MyCreditCardProfile cards={c}/></Link>
                            ))}
                        </div>
                    )
                    : (
                        <h6>{t("youDoNotHaveCardYetDoYouWantTo")}<Link to={"/createCard"}>{t("create")}</Link>?</h6>
                    )
                }
            </div>
        </div>
    ) : (
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only"></span>
        </div>
    )
}