import {useSelector} from "react-redux";
import {getCreditCardsList} from "../../../Store/myCreaditCard";
import {getCurrentUserId} from "../../../Store/users";
import {Link} from "react-router-dom";
import {MyCreditCards} from "../MyCreditCards/MyCreditCards";

export const Wallet = () => {
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
                <h6>У вас еще нет карты, хотите <Link to={"/createCard"}>Создать</Link>?</h6>
            </div>
        )
    } else {
        return (
            <div>
                <h6>У вас еще нет карты, хотите <Link to={"/createCard"}>Создать</Link>?</h6>
            </div>
        )
    }

}