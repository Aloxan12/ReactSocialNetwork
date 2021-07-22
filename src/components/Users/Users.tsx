import React, {useEffect} from "react";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import {FilterType, follow, getUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageSelector, getFollowingIsProgressSelector,
    getPageSizeSelector,
    getTotalUsersCountsSelector,
    getUsersFilter, getUserSuper
} from "../../redux/users-selectors";
import {UsersSearchForm} from "./UsersSearchForm";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users = () => {
    const users = useSelector(getUserSuper)
    const totalUsersCount = useSelector(getTotalUsersCountsSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingIsProgressSelector)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter
        if(!!parsed.page) actualPage = Number(parsed.page)
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend){
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const followU = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowU = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            {
                users.map(u => <User followingIsProgress={followingInProgress}
                                           unfollow={unfollowU}
                                           follow={followU}
                                           user={u}
                                           key={u.id}
                />)
            }

            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalItemCounts={totalUsersCount}  />
        </div>
    )
}

