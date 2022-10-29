import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {getCardBankNameByIds} from "../../Store/myCreaditCard";
import card from "../../../img/credit-card.png";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {PopupDeleteCard} from "../../Common/popups/popupDeleteCard";
import {AddMoneyPopup} from "../../Common/popups/addMoneyPopup";

export const MyCreditCardInfo = () => {
    const {cardId} = useParams()
    const [removePopup, setRemovePopup] = useState(false)
    const [addMoneyPopup, setAddMoneyPopup] = useState(false)
    const cardData = useSelector(getCardBankNameByIds(cardId))
    const navigate = useNavigate()
    const warning = () => {
        setRemovePopup(removePopup === true ? false : true)
    }
    const addMoney = () => {
        setAddMoneyPopup(addMoneyPopup === true ? false : true)
    }
    if (removePopup === true) return (
        <PopupDeleteCard warning={warning} cardData={cardData}/>
    )
    if (addMoneyPopup === true) return (
        <AddMoneyPopup addMoney={addMoney}/>
    )
    return cardData ? (
        <div>
            Счет: {cardData.amountOfMoney}{" "}{cardData.currency}
            <div style={{position: 'relative'}}>
                <img style={{width: '250px'}} src={card}/>
                <p className={"text-white"}
                   style={{
                       position: 'absolute',
                       top: '10px',
                       left: '20px',
                       fontSize: '18px'
                   }}>{cardData.bank}</p>
                <p className={"text-white"}
                   style={{position: 'absolute', top: '10px', left: '190px', fontSize: '16px', color: 'white'}}>MIR</p>
                <p className={"text-white"} style={{
                    position: 'absolute',
                    top: '100px',
                    left: '20px',
                    fontSize: '18px'
                }}>{cardData.numberCard}</p>
                <p className={"text-white"} style={{
                    position: 'absolute',
                    top: '120px',
                    left: '20px',
                    fontSize: '12px'
                }}>{cardData.authorName}{" "}{cardData.dateOfCreation}</p>
            </div>
            <Button role={"button"} className={"bg-info m-2"} onClick={() => navigate(-1)}>Назад</Button>
            <Button role={"button"} className={"bg-primary m-2"} onClick={addMoney}>Пополнить</Button>
            <Link to={`/translate/${cardData._id}`} className={"m-2"}><Button role={"button"}
                                                                              className={"bg-success m-2"}>Перевести</Button></Link>
            <Button role={"button"} className={"bg-danger m-2"} onClick={warning}>Заблокировать</Button>
        </div>
    ) : (
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only"></span>
        </div>
    )
}