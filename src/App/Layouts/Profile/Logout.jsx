import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logOut} from "../../Store/users";

export const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, [])
    return (
        <div>
            Выход и системы
        </div>
    )
}