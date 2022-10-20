import {MyNotice} from "./MyNotice";
import {NoticeLoader} from "../../Hoc/noticeLoader";

export const Notice = () => {
    return (
        <NoticeLoader>
            <MyNotice/>
        </NoticeLoader>
    )
}