import {Dispatch} from "redux";
import {APIResponseType, ResultCodesEnum} from "../api/api";
import {UserType} from "./types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {UsersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCounts: 0,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
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
            return {...state, users: action.users}
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_COUNT":
            return {...state, totalUsersCounts: action.totalPage}
        case "TOGGLE_IS_FETCHING":
            return {...state,isFetching: action.isFetching}
        case 'SN/USERS/SET_FILTER': {
            return {...state, filter: action.payload}
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

export const actions = {
    unfollowSuccess: (userID: number) => ({type: "UNFOLLOW", userID} as const),
    followSuccess: (userID: number) => ({type: "FOLLOW", userID} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalPage: number) => ({type: "SET_TOTAL_COUNT", totalPage} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    toggleFollowingIsProgress: (isFetching: boolean, userId: number) => ({type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userId
    } as const)
}

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        const data = await UsersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
const followUnfollow = async (dispatch: Dispatch<ActionsTypes>, userId: number,apiMethod:  (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsTypes )=>{
    dispatch(actions.toggleFollowingIsProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingIsProgress(false, userId))
}
export const follow = (userId: number):ThunkType => {
    return async (dispatch) => {
        await followUnfollow(dispatch, userId, UsersAPI.follow.bind(UsersAPI),actions.followSuccess)
    }
}
export const unfollow = (userId: number):ThunkType => {
    return async (dispatch) => {
        await followUnfollow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI),actions.unfollowSuccess)
    }
}

export type FilterType = typeof initialState.filter
export type InitialState = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default usersReducer