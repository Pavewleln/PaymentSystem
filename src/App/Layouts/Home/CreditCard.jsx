import card from "../../../img/credit-card.png";
import React, {useEffect} from 'react'
import {useWallet} from "./Home";
import {Link} from "react-router-dom";

export const CreditCard = ({cardInfo, bank}) => {
    const {setCardId} = useWallet()
    const myCardOfThisBank = cardInfo.bank === bank ? cardInfo : null
    useEffect(() => {
        if (myCardOfThisBank) setCardId(myCardOfThisBank._id)
    }, [myCardOfThisBank])
    if (myCardOfThisBank) {
        return (
            <div>
                <p style={{color: '#5A55D2', fontSize: '28px'}}>{myCardOfThisBank.amountOfMoney}</p>
                <Link to={`/profile/${myCardOfThisBank._id}`}>
                    <div style={{position: 'relative'}}>
                        <img style={{width: '250px'}} src={card}/>
                        <p className={"text-white"}
                           style={{
                               position: 'absolute',
                               top: '10px',
                               left: '20px',
                               fontSize: '18px'
                           }}>{myCardOfThisBank.bank}</p>
                        <p className={"text-white"}
                           style={{position: 'absolute', top: '10px', right: '20px', fontSize: '16px'}}>MIR</p>
                        <p className={"text-white"} style={{
                            position: 'absolute',
                            top: '100px',
                            left: '20px',
                            fontSize: '18px'
                        }}>{myCardOfThisBank.numberCard}</p>
                        <p className={"text-white"} style={{
                            position: 'absolute',
                            top: '120px',
                            left: '20px',
                            fontSize: '12px'
                        }}>{myCardOfThisBank.authorName}{" "}{myCardOfThisBank.dateOfCreation}</p>
                    </div>
                </Link>
            </div>
        )
    } else {
        return null
    }
}