import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadHistoryList} from "../Store/history";

export const HistoryLoader = ({children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadHistoryList());
    }, []);
    return children;
};