import {useDispatch, useSelector} from "react-redux";
import {deleteDataNotice, getNotice} from "../../Store/notice";
import {getCurrentUserId} from "../../Store/users";

export const MyNotice = () => {
    const notice = useSelector(getNotice())
    const dispatch = useDispatch()
    const currentUserId = useSelector(getCurrentUserId())
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    if (notice) {
        const deleteNotice = (id) => {
            dispatch(deleteDataNotice(id))
        }
        const myNotice = notice.filter((n) => n !== undefined && n.userId === currentUserId)
        return myNotice.length !== 0 ? (
            <div className={"m-2 p-2"}>
                {myNotice.map((n) => (
                    <div key={n._id}>
                        <div className={"fs-5 d-flex align-items-center m-2"}>
                            {n.datetime === date
                                ? <span className={"text-info fs-6"}>новое</span>
                                : <span className={"fs-6 text-decoration-underline"}>{n.datetime}</span>
                            }
                            {" "}
                            <span style={{marginLeft: '20px', marginRight: '20px'}}>{n.text}</span>
                            <span role={"button"} className={"fs-3 text-danger"} style={{marginLeft: '20px'}} onClick={() => deleteNotice(n._id)} aria-hidden="true">&times;</span>
                        </div>
                        <hr/>
                    </div>
                ))
                }
            </div>
        ) : (
            <div>
                У вас нет уведомлений
            </div>
        )
    } else {
        return (
            <div>
                У вас нет уведомлений
            </div>
        )
    }

}