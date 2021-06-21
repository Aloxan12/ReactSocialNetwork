import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import styles from "./users.module.css";
import {UserType} from "../../redux/types/types";


type UserPropsType = {
    user: UserType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingIsProgress: Array<number>
}

export const User =(props: UserPropsType) => {
    let u = props.user;
    return (
        <div>

            <div>
                    <span>
                        <div>
                           <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     className={styles.UsersPhoto}/>
                           </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingIsProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.unfollow(u.id)
                                          }}>Unfollow</button>
                                : <button disabled={props.followingIsProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.follow(u.id)
                                          }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
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


