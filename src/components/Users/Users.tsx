import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import styles from "./users.module.css";
import * as axios from "axios";
import {FollowAPI} from "../../api/api";


type UsersType = {
    totalUsersCounts: number,
    pageSize: number,
    currentPage: number,
    users: Array<any>,
    onPageChanged: (pageNumber: number) => void
    unfollow: (userId: string) => void
    follow: (userId: string) => void
    toggleFollowingIsProgress: (isFetching:boolean, userId: number)=> void
    followingIsProgress: Array<number>
}

export const Users = (props: UsersType) => {
    let pageCount = Math.ceil(props.totalUsersCounts / props.pageSize)

    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                           <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     className={styles.UsersPhoto}/>
                           </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingIsProgress.some(id=> id === u.id)} onClick={() =>{
                                    props.toggleFollowingIsProgress(true, u.id)
                                        FollowAPI.unfollow(u.id).then(data => {
                                            if (data.resultCode===0){
                                                props.unfollow(u.id)
                                            }
                                    props.toggleFollowingIsProgress(false, u.id)
                                        });

                                }}>Unfollow</button>
                                : <button disabled={props.followingIsProgress.some(id=> id === u.id)} onClick={() =>{
                                    props.toggleFollowingIsProgress(true, u.id)
                                    FollowAPI.follow(u.id).then(data => {
                                            if (data.resultCode===0){
                                                props.follow(u.id)
                                            }
                                        props.toggleFollowingIsProgress(false, u.id)
                                        });
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
                            <div></div>
                        </span>
                    </span>
                </div>)
            }
            <div className={styles.pageBlock}>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ""}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                })}
            </div>
        </div>
    )
}
