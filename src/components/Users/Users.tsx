import React from "react";
import { Paginator } from "../Common/Paginator/Paginator";
import {UsersPropsType} from "./UsersContainer";
import {User} from "./User";


export const Users = React.memo ((props: UsersPropsType) => {
    let pageCount = Math.ceil(props.totalUsersCounts / props.pageSize)

    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {
                props.users.map(u => <User followingIsProgress={props.followingIsProgress}
                                           unfollow={props.unfollow}
                                           follow={props.follow}
                                           user={u}
                                           key={u.id}
                />)
            }
            <Paginator currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
                       pageSize={props.pageSize}
                       totalItemCounts={props.totalUsersCounts}  />
        </div>
    )
})
