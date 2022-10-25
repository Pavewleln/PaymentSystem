import card from "../../../../img/credit-card.png";
import React, {useEffect} from 'react'
import {useWallet} from "../Home";
import {Link} from "react-router-dom";
import s from './CreditCard.module.scss'

export const CreditCard = ({cardInfo, bank}) => {
    const {setCardId} = useWallet()
    const myCardOfThisBank = cardInfo.bank === bank ? cardInfo : null
    useEffect(() => {
        if (myCardOfThisBank) setCardId(myCardOfThisBank._id)
    }, [myCardOfThisBank])
    if (myCardOfThisBank) {
        return (
            <div className={s.block}>
                <p className={s.creditCardTitle}>{myCardOfThisBank.amountOfMoney}</p>
                <Link to={`/profile/${myCardOfThisBank._id}`} className={s.creditCardInfo}>
                    <div>
                        <img className={s.image} src={card}/>
                        <p className={s.bankName}>{myCardOfThisBank.bank}</p>
                        <p className={s.paymentName}>MIR</p>
                        <p className={s.numberCard}>{myCardOfThisBank.numberCard}</p>
                        <p className={s.authorName}>{myCardOfThisBank.authorName}{" "}{myCardOfThisBank.dateOfCreation}</p>
                    </div>
                </Link>
            </div>
        )
    } else {
        return null
    }
}