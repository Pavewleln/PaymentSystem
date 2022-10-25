import {Button} from "react-bootstrap";
import {follow, unfollow} from "../Store/users";
import {useDispatch} from "react-redux";

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
                    ? <Button
                        onClick={() => unfollowUser(followers[followers.findIndex((f) => f.follower === p._id)]._id)}>Удалить
                        из друзей</Button>
                    : <Button onClick={() => followUser(p._id)}>Добавить в друзья</Button>

                }
            </div>
        )
    } else {
        return (
            <div>
                <Button onClick={() => followUser(p._id)}>Добавить в друзья</Button>
            </div>
        )
    }
}