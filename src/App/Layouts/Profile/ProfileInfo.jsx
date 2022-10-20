import imageUserUndefined from "../../../img/header/imageUserUndefined.jpg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCurrentUserData, getCurrentUserId} from "../../Store/users";
import {getCreditCardsList} from "../../Store/myCreaditCard";
import {MyCreditCardProfile} from "./MyCreditCardProfile";
import {AiOutlineSetting} from "@react-icons/all-files/ai/AiOutlineSetting";

export const ProfileInfo = () => {
    const currentUser = useSelector(getCurrentUserData());
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    return currentUser && cards ? (
        <div className={"p-3 bg-white rounded-4 m-4"}>
            <div className={"d-flex justify-content-between"}>
                <div>
                    <Link to={`/profile/${currentUserId}/edit`} className={"position-absolute"}><AiOutlineSetting/></Link>
                    <div className={"d-flex align-items-center"}>
                        <div className={"rounded-4 overflow-hidden"}>
                            <img style={{width: '100px', height: '100px'}}
                                 src={currentUser.image ? currentUser.image : imageUserUndefined}/>
                        </div>
                        <div>
                            <h3>{currentUser.name}</h3>
                        </div>
                    </div>
                    <div className={"m-2"}>
                        <p>Место жительства: {currentUser.location}</p>
                        <p>Дата рождения: {currentUser.dateOfBirth}</p>
                        <p>Номер телефона: {currentUser.telephone}</p>
                        <p>Пол: {currentUser.sex === "male" ? "Мужской" : currentUser.sex === "female" ? "Женский" : "Другое"}</p>
                        <p>Описание: {currentUser.description}</p>
                    </div>
                    <Link to={'/logout'} className={"text-decoration-none text-info m-2 "}>Выйти
                        из аккаунта</Link>
                </div>
                {cards.filter((p) => p.userId === currentUserId)
                    ? (
                        <div className={"d-flex flex-wrap w-50 justify-content-end"}>
                            {(cards.filter((p) => p.userId === currentUserId)).map((c) => (
                                <Link key={c._id} to={`/profile/${c._id}`}><MyCreditCardProfile cards={c}/></Link>
                            ))}
                        </div>
                    )
                    : (
                        "У вас пока нет карты нашего банка"
                    )
                }
            </div>
        </div>
    ) : (
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only"></span>
        </div>
    )
}