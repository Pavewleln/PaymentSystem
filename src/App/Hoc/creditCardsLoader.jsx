import {useDispatch, useSelector} from "react-redux";
import {getDataLoadingStatus, getIsLoggedIn} from "../Store/users";
import {useEffect} from "react";
import {getCreditCardsList, getCreditCardsLoadingStatus, loadCardsList} from "../Store/myCreaditCard";


export const CreditCardsLoader = ({ children }) => {
    const loading = useSelector(getCreditCardsLoadingStatus())
    const dataStatus = useSelector(getDataLoadingStatus());
    const cards = useSelector(getCreditCardsList())
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCardsList());
    }, []);
    if (loading) return (<div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
    </div>);
    return children;
};