import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn} from "../Store/users";
import {useEffect} from "react";
import {getHistory, getHistoryLoadingStatus, loadHistoryList} from "../Store/history";

export const HistoryLoader = ({children}) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadHistoryList());
    }, []);
    return children;
};