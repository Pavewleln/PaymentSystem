import {Login} from "./Login";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../Store/users";
import {ProfileInfo} from "./ProfileInfo";
import {CreditCardsLoader} from "../../Hoc/creditCardsLoader";

export const Profile = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    if (isLoggedIn) {
        return (
            <CreditCardsLoader>
                <ProfileInfo/>
            </CreditCardsLoader>
        )
    } else {
        return <Login/>
    }
}