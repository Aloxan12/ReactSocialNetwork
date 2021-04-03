import {v1} from "uuid";

export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"

export const unfollowAC = (userID: string) =>({type: UNFOLLOW, userID}as const)
export const followAC = (userID: string) =>({type: FOLLOW, userID}as const)
export const setUsersAC = (users: Array<usersType>) =>({type: SET_USERS, users}as const)
type ActionType = ReturnType<typeof unfollowAC> | ReturnType<typeof followAC> | ReturnType<typeof setUsersAC>


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
}

let initialState: InitialStateUsersType = {
    users: [],
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
                users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

export default usersReducer