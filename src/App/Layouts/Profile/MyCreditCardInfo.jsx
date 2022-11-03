import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {getCardBankNameByIds} from "../../Store/myCreaditCard";
import card from "../../../img/credit-card.png";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {PopupDeleteCard} from "../../Common/popups/popupDeleteCard";
import {AddMoneyPopup} from "../../Common/popups/addMoneyPopup";
import {useTranslation} from "react-i18next";

export const MyCreditCardInfo = () => {
    const {t} = useTranslation();
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
                }}>{cardData.numberCard.toString().slice(0, 4)}{" "}{cardData.numberCard.toString().slice(4, 8)}{" "}{cardData.numberCard.toString().slice(8, 12)}{" "}{cardData.numberCard.toString().slice(12, 16)}</p>
                <p className={"text-white"} style={{
                    position: 'absolute',
                    top: '120px',
                    left: '20px',
                    fontSize: '12px'
                }}>{cardData.authorName}{" "}{cardData.dateOfCreation}</p>
            </div>
            <Button role={"button"} className={"bg-info m-2"} onClick={() => navigate(-1)}>{t("back")}</Button>
            <Button role={"button"} className={"bg-primary m-2"} onClick={addMoney}>{t("topUp")}</Button>
            <Link to={`/translate/${cardData._id}`} className={"m-2"}><Button role={"button"}
                                                                              className={"bg-success m-2"}>{t("translate")}</Button></Link>
            <Button role={"button"} className={"bg-danger m-2"} onClick={warning}>{t("block")}</Button>
        </div>
    ) : (
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only"></span>
        </div>
    )
}