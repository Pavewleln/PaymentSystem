import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getNoticeLoadingStatus, loadNoticeList} from "../Store/notice";
import {getCreditCardsList} from "../Store/myCreaditCard";

export const NoticeLoader = ({children}) => {
    const creditCardsList = useSelector(getCreditCardsList())
    const loading = useSelector(getNoticeLoadingStatus())
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadNoticeList());
    }, [creditCardsList]);
    if(loading) return (
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only"></span>
        </div>
    )
    return children;
};