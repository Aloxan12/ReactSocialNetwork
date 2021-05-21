import {Dispatch} from "redux";
import {UsersAPI} from "../api/api";

export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
export const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

export const unfollowSuccess = (userID: number) => ({type: UNFOLLOW, userID} as const)
export const followSuccess = (userID: number) => ({type: FOLLOW, userID} as const)
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalPage: number) => ({type: SET_TOTAL_COUNT, totalPage} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingIsProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const)

type ActionType = ReturnType<typeof unfollowSuccess> | ReturnType<typeof followSuccess> | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingIsProgress>


export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type InitialStateUsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCounts: number
    currentPage: number
    isFetching: boolean
    followingIsProgress: Array<number>
}

let initialState: InitialStateUsersType = {
    users: [],
    pageSize: 5,
    totalUsersCounts: 0,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: [],
}

export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionType): InitialStateUsersType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                //users:[...state.users]  идентичная запись
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                //users:[...state.users]  идентичная запись
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET_TOTAL_COUNT":
            return {
                ...state,
                totalUsersCounts: action.totalPage
            }
        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingIsProgress: action.isFetching
                    ? [...state.followingIsProgress, action.userId]
                    : state.followingIsProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        const data = await UsersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
const followUnfollow = async (dispatch: Dispatch, userId: number,apiMethod: any, actionCreator: any )=>{
    dispatch(toggleFollowingIsProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingIsProgress(false, userId))
}
export const follow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        await followUnfollow(dispatch, userId, UsersAPI.follow.bind(UsersAPI),followSuccess)
    }
}
export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        await followUnfollow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI),unfollowSuccess)
    }
}


export default usersReducer