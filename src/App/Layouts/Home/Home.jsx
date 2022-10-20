import {Rates} from "./Rates";
import {HistoryInfo} from "./HistoryInfo";
import {Wallet} from "./Wallet";
import {Link} from "react-router-dom";
import {CreditCardsLoader} from "../../Hoc/creditCardsLoader";
import {HistoryLoader} from "../../Hoc/historyLoader";
import React, {useContext, useState} from "react";

const WalletContext = React.createContext()
export const useWallet = () => {
    return useContext(WalletContext);
};
export const Home = () => {
    const [cardId, setCardId] = useState()
    return (
        <div>
            <Rates/>
            <div className="d-flex p-2">
                <div className={" p-4 bg-white rounded-4"} style={{width: '73%'}}>
                    <div className={"d-flex justify-content-between"}>
                        <h3 style={{marginBottom: '20px'}}>История карты</h3>
                        <Link className={"text-decoration-none fw-normal"} to={"/history"}>Узнать больше</Link>
                    </div>
                    {cardId && (
                        <HistoryLoader>
                            <HistoryInfo historyCardForId={cardId}/>
                        </HistoryLoader>
                        )
                    }
                </div>
                <div className={"bg-white rounded-4 p-2 m-3"} style={{width: '23%'}}>
                    <WalletContext.Provider value={{setCardId}}>
                        <CreditCardsLoader>
                            <Wallet/>
                        </CreditCardsLoader>
                    </WalletContext.Provider>
                </div>
            </div>
        </div>
    )
}