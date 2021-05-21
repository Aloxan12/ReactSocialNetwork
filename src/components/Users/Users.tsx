import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import { Paginator } from "../Common/Paginator/Paginator";
import styles from "./users.module.css";
import {UsersPropsType} from "./UsersContainer";


export const Users = React.memo ((props: UsersPropsType) => {
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
                                ? <button disabled={props.followingIsProgress.some(id=> id === u.id)}
                                          onClick={() =>{props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button disabled={props.followingIsProgress.some(id=> id === u.id)}
                                          onClick={() =>{props.follow(u.id)
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
                </div>)
            }
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} pageSize={props.pageSize} totalUsersCounts={props.totalUsersCounts}  />
            {/*<div className={styles.pageBlock}>*/}
            {/*    {pages.map(p => {*/}
            {/*        return <span className={props.currentPage === p ? styles.selectedPage : ""}*/}
            {/*                     onClick={(e) => {*/}
            {/*                         props.onPageChanged(p)*/}
            {/*                     }}>{p}</span>*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    )
})
