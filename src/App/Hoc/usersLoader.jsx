import {useDispatch, useSelector} from "react-redux";
import {getDataLoadingStatus, getIsLoggedIn, getUsersLoadingStatus, loadUsersList} from "../Store/users";
import {useEffect} from "react";

export const UsersLoader = ({ children }) => {
    const loading = useSelector(getUsersLoadingStatus())
    const dataStatus = useSelector(getDataLoadingStatus());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, [isLoggedIn]);
    if (loading) return (<div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
    </div>);
    return children;
};