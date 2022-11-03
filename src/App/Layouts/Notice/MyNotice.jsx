import {useDispatch, useSelector} from "react-redux";
import {deleteDataNotice, getNotice} from "../../Store/notice";
import {getCurrentUserId} from "../../Store/users";
import s from './Notice.module.scss'
import _ from "lodash";
import {useTranslation} from "react-i18next";

export const MyNotice = () => {
    const {t} = useTranslation();
    const notice = useSelector(getNotice())
    const dispatch = useDispatch()
    const currentUserId = useSelector(getCurrentUserId())
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    if (notice) {
        const deleteNotice = (id) => {
            dispatch(deleteDataNotice(id))
        }
        const myNotice = notice.filter((n) => n !== undefined && n.userId === currentUserId)
        const handleSort = () => {
            return _.orderBy(
                myNotice,
                ["datetime"],
                ["desc"]
            )
        }
        const myNoticeForDateTime = handleSort()
        return myNoticeForDateTime.length !== 0 ? (
            <div className={s.notice}>
                {myNoticeForDateTime.map((n) => (
                    <div key={n._id}>
                        <div className={s.block}>
                            {n.datetime === date
                                ? <span className={s.new}>{t("new")}</span>
                                : <span className={s.dateTime}>{n.datetime}</span>
                            }
                            {" "}
                            <span className={s.text}>{n.text}</span>
                            <span className={s.delete} role={"button"} onClick={() => deleteNotice(n._id)} aria-hidden="true">&times;</span>
                        </div>
                        <hr/>
                    </div>
                ))
                }
            </div>
        ) : (
            <div>
                {t("youDoNotHaveNotifications")}
            </div>
        )
    } else {
        return (
            <div>
                {t("youDoNotHaveNotifications")}
            </div>
        )
    }

}