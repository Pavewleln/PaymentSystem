import {Rates} from "./Rates/Rates";
import {HistoryInfo} from "./HistoryInfo/HistoryInfo";
import {Wallet} from "./Wallet/Wallet";
import {Link} from "react-router-dom";
import {CreditCardsLoader} from "../../Hoc/creditCardsLoader";
import {HistoryLoader} from "../../Hoc/historyLoader";
import React, {useContext, useState} from "react";
import s from './Home.module.scss'

const WalletContext = React.createContext()
export const useWallet = () => {
    return useContext(WalletContext);
};
export const Home = () => {
    const [cardId, setCardId] = useState()
    return (
        <div>
            <Rates/>
            <div className={s.home}>
                <div className={s.homeLeft}>
                    <div className={s.homeTitle}>
                        <h3 className={s.historyCard}>История карты</h3>
                        <Link className={s.historyCardDescription} to={"/history"}>Узнать больше</Link>
                    </div>
                    {cardId ? (
                        <HistoryLoader>
                            <HistoryInfo historyCardForId={cardId}/>
                        </HistoryLoader>
                    ) : (
                        <p>У вас нет истории</p>
                    )
                    }
                </div>
                <div className={s.homeRight}>
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