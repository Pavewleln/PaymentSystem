import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn, getUsersLoadingStatus, loadUsersList} from "../Store/users";
import {useEffect} from "react";

export const AppLoader = ({children}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUsersList())
        }
    }, [])
    if (usersStatusLoading) return (<div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
    </div>);
    return children;
};