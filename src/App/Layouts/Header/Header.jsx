import profile from '../../../img/header/imageUserUndefined.jpg'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../Store/users";
import {Authentication} from "./Authentication";

export const Header = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <>
            {isLoggedIn
                ? <Authentication/>
                : (
                    <div className="d-flex justify-content-end p-3 w-100">
                        <div className={"d-flex align-items-center"}>
                            <h5 style={{marginRight: '20px'}}>Войдите в систему, чтобы продолжить</h5>
                            <Link to={"/profile"} className={"rounded-3 overflow-hidden"}
                                  style={{width: '50px', height: '50px'}}>
                                <img style={{width: '100%', height: '100%'}} src={profile}/>
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}