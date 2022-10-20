import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn} from "../Store/users";
import {useEffect} from "react";
import {getHistory, getHistoryLoadingStatus, loadHistoryList} from "../Store/history";

export const HistoryLoader = ({children}) => {
    const loading = useSelector(getHistoryLoadingStatus())
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadHistoryList());
    }, []);
    if(loading) return (
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only"></span>
        </div>
    )
    return children;
};