import card from "../../../../img/credit-card.png";
import React from "react";
import s from './MyCreditCardProfile.module.scss'

export const MyCreditCardProfile = ({cards}) => {
    return (
        <div key={cards._id}>
            <div className={s.creditCardInfo}>
                <img className={s.image} src={card}/>
                <p className={s.bankName}>{cards.bank}</p>
                <p className={s.paymentName}>MIR</p>
                <p className={s.numberCard}>{cards.numberCard.toString().slice(0, 4)}{" "}{cards.numberCard.toString().slice(4, 8)}{" "}{cards.numberCard.toString().slice(8, 12)}{" "}{cards.numberCard.toString().slice(12, 16)}</p>
                <p className={s.authorName}>{cards.authorName}{" "}{cards.dateOfCreation}</p>
            </div>
        </div>
    )
}