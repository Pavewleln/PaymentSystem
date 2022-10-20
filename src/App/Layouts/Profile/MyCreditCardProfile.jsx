import card from "../../../img/credit-card.png";
import React from "react";

export const MyCreditCardProfile = ({cards}) => {
    return (
        <div key={cards._id}>
            <div style={{position: 'relative'}}>
                <img style={{width: '250px'}} src={card}/>
                <p className={"text-white"}
                   style={{
                       position: 'absolute',
                       top: '10px',
                       left: '20px',
                       fontSize: '18px'
                   }}>{cards.bank}</p>
                <p className={"text-white"}
                   style={{position: 'absolute', top: '10px', left: '200px', fontSize: '16px'}}>MIR</p>
                <p className={"text-white"} style={{
                    position: 'absolute',
                    top: '100px',
                    left: '20px',
                    fontSize: '18px'
                }}>{cards.numberCard}</p>
                <p className={"text-white"} style={{
                    position: 'absolute',
                    top: '120px',
                    left: '20px',
                    fontSize: '12px'
                }}>{cards.authorName}{" "}{cards.dateOfCreation}</p>
            </div>
        </div>
    )
}