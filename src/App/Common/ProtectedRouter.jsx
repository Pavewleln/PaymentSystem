import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../Store/users";
import {Navigate, Outlet} from "react-router";

export const ProtectedRoute = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return isLoggedIn ? <Outlet/> : <Navigate to={"/profile"}/>
};