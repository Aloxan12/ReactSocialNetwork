import {v1} from "uuid";

export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

export const unfollowAC = (userID: string) =>({type: UNFOLLOW, userID}as const)
export const followAC = (userID: string) =>({type: FOLLOW, userID}as const)
export const setUsersAC = (users: Array<usersType>) =>({type: SET_USERS, users}as const)
export const setCurrentPageAC = (currentPage: number) =>({type: SET_CURRENT_PAGE, currentPage }as const)
export const setTotalUsersCountAC = (totalPage: number) =>({type: SET_TOTAL_COUNT, totalPage }as const)
export const toggleIsFetchingAC = (isFetching: boolean) =>({type: TOGGLE_IS_FETCHING, isFetching  }as const)

type ActionType = ReturnType<typeof unfollowAC> | ReturnType<typeof followAC> | ReturnType<typeof setUsersAC>
| ReturnType<typeof setCurrentPageAC> | ReturnType<typeof setTotalUsersCountAC> | ReturnType<typeof toggleIsFetchingAC>

export type usersType = {
    id: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
    photoUrl:string
}
type LocationType = {
    city: string
    country: string
}
export type InitialStateUsersType  = {
    users: Array<any>
    pageSize: number
    totalUsersCounts: number
    currentPage: number
    isFetching: boolean
}

let initialState: InitialStateUsersType = {
    users: [],
    pageSize: 5,
    totalUsersCounts: 0,
    currentPage: 1,
    isFetching: false
}

export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionType):InitialStateUsersType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                //users:[...state.users]  идентичная запись
                users:state.users.map(u=> {
                    if(u.id === action.userID){
                        return {...u, followed: true}
                    }return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                //users:[...state.users]  идентичная запись
                users:state.users.map(u=> {
                    if(u.id === action.userID){
                        return {...u, followed: false}
                    }return u
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
        default:
            return state
    }
}

export default usersReducer