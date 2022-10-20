import {Button} from "react-bootstrap";
import {CreditCard} from "./CreditCard";
import {useState} from "react";
import {Link} from "react-router-dom";

export const MyCreditCards = ({myCreditCards}) => {
    const myBanks = myCreditCards.map((c) => c.bank)
    const [value, setValue] = useState(myBanks[0]);

    const changeSelect = ({target}) => {
        setValue(target.value);
    }
    return (
        <div>
            <div className={"d-flex justify-content-between m-3"}>
                {myBanks.length === 1
                    ? myBanks.map((b) => (<div key={b}>{b}</div>))
                    : <select value={value} onChange={changeSelect} className={"bg-white border rounded-3"}
                              style={{paddingLeft: '20px', paddingTop: '3px', paddingRight: '10px', paddingBottom: '3px'}}>
                        {myBanks.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>}
                <Link to={"/createCard"} className={"text-white text-decoration-none"}><Button>+</Button></Link>
            </div>
            <div className={"p-3"}>
                {myCreditCards.map((c) => (
                    <div key={c._id}>
                        <CreditCard cardInfo={c} bank={value}/>
                    </div>
                ))}
            </div>
        </div>
    )
}