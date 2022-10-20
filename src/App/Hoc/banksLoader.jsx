import {useDispatch, useSelector} from "react-redux";
import {getDataLoadingStatus, getIsLoggedIn} from "../Store/users";
import {useEffect} from "react";
import {getCreditCardsLoadingStatus, loadBanksNameList} from "../Store/myCreaditCard";


export const BanksLoader = ({children}) => {
    const loading = useSelector(getCreditCardsLoadingStatus)
    const dataStatus = useSelector(getDataLoadingStatus());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBanksNameList());
    }, [isLoggedIn]);
    if (loading) return (<div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
    </div>);
    return children;
};