import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import styles from "./users.module.css";
import {UserType} from "../../redux/types/types";


type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingIsProgress: Array<number>
}

export const User:React.FC<UserPropsType> =({user, follow, unfollow, followingIsProgress}) => {
    return (
        <div>

            <div>
                    <span>
                        <div>
                           <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                     className={styles.UsersPhoto}/>
                           </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingIsProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id)
                                          }}>Unfollow</button>
                                : <button disabled={followingIsProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
            </div>

        </div>
    )
}


