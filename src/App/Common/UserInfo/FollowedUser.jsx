import {follow, unfollow} from "../../Store/users";
import {useDispatch} from "react-redux";
import s from './UserInfo.module.scss'

export const FollowedUser = ({currentUserData, p}) => {
    const dispatch = useDispatch()
    const followUser = (id) => {
        dispatch(follow(id))
    }
    const unfollowUser = (id) => {
        dispatch(unfollow(id))
    }
    if (currentUserData.followers) {
        const followers = Object.values(currentUserData.followers)

        return (
            <div>
                {followers && followers.find((f) => f.follower === p._id)
                    ? <button className={s.button}
                              onClick={() => unfollowUser(followers[followers.findIndex((f) => f.follower === p._id)]._id)}>
                        Удалить из друзей</button>
                    : <button className={s.button} onClick={() => followUser(p._id)}>
                        Добавить в друзья
                    </button>

                }
            </div>
        )
    } else {
        return (
            <div>
                <button className={s.button} onClick={() => followUser(p._id)}>Добавить в друзья</button>
            </div>
        )
    }
}