import {Rates} from "./Rates/Rates";
import {HistoryInfo} from "./HistoryInfo/HistoryInfo";
import {Wallet} from "./Wallet/Wallet";
import {Link} from "react-router-dom";
import {CreditCardsLoader} from "../../Hoc/creditCardsLoader";
import {HistoryLoader} from "../../Hoc/historyLoader";
import React, {useContext, useState} from "react";
import s from './Home.module.scss'
import {useTranslation} from "react-i18next";

const WalletContext = React.createContext()
export const useWallet = () => {
    return useContext(WalletContext);
};
export const Home = () => {
    const {t} = useTranslation();
    const [cardId, setCardId] = useState()
    return (
        <div>
            <Rates/>
            <div className={s.home}>
                <div className={s.homeLeft}>
                    <div className={s.homeTitle}>
                        <h3 className={s.historyCard}>{t("mapHistory")}</h3>
                        <Link className={s.historyCardDescription} to={"/history"}>{t("toLearnMore")}</Link>
                    </div>
                    {cardId ? (
                        <HistoryLoader>
                            <HistoryInfo historyCardForId={cardId}/>
                        </HistoryLoader>
                    ) : (
                        <p>{t("noHistory")}</p>
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