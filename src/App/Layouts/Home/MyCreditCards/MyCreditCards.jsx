import {Button} from "react-bootstrap";
import {CreditCard} from "../CreditCard/CreditCard";
import {useState} from "react";
import {Link} from "react-router-dom";
import s from './MyCreditCards.module.scss'

export const MyCreditCards = ({myCreditCards}) => {
    const myBanks = myCreditCards.map((c) => c.bank)
    const [value, setValue] = useState(myBanks[0]);

    const changeSelect = ({target}) => {
        setValue(target.value);
    }
    return (
        <div>
            <div className={s.myCreditCard}>
                {myBanks.length === 1
                    ? myBanks.map((b) => (<div key={b}>{b}</div>))
                    : <select value={value} onChange={changeSelect} className={s.selectBanksName}>
                        {myBanks.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>}
                <Link to={"/createCard"} className={s.addNewCard}><Button>+</Button></Link>
            </div>
            <div className={s.creditCard}>
                {myCreditCards.map((c) => (
                    <div key={c._id}>
                        <CreditCard cardInfo={c} bank={value}/>
                    </div>
                ))}
            </div>
        </div>
    )
}