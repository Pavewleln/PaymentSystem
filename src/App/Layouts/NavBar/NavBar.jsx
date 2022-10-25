import {Link} from "react-router-dom"
import logo from '../../img/logo.svg'
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../Store/users";

export const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return isLoggedIn ? (
        <div className="bg-white p-3" style={{
            marginRight: '30px'
        }}>
            <img className={"m-2"} src={logo}/>
            <hr/>
            <ul>
                <li className={"m-2"} style={{listStyleType: 'none'}}><Link to={'/home'}
                                                                            className={"text-decoration-none fw-normal fs-5 text-black"}>Главная</Link>
                </li>
                <li className={"m-2"} style={{listStyleType: 'none'}}><Link to={'/users'}
                                                                            className={"text-decoration-none fw-normal fs-5 text-black"}>Пользователи</Link>
                </li>
                <li className={"m-2"} style={{listStyleType: 'none'}}><Link to={'/followers'}
                                                                            className={"text-decoration-none fw-normal fs-5 text-black"}>Друзья</Link>
                </li>
                <li className={"m-2"} style={{listStyleType: 'none'}}><Link to={'/accounting'}
                                                                            className={"text-decoration-none fw-normal fs-5 text-black"}>Учет</Link>
                </li>
                <li className={"m-2"} style={{listStyleType: 'none'}}><Link to={'/history'}
                                                                            className={"text-decoration-none fw-normal fs-5 text-black"}>История</Link>
                </li>
                <li className={"m-2"} style={{listStyleType: 'none'}}><Link to={'/settings'}
                                                                            className={"text-decoration-none fw-normal fs-5 text-black"}>Настройки</Link>
                </li>
            </ul>
        </div>
    ) : (
        ""
    )
}