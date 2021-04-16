
export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
export const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

export const unfollow = (userID: string) =>({type: UNFOLLOW, userID}as const)
export const follow = (userID: string) =>({type: FOLLOW, userID}as const)
export const setUsers = (users: Array<usersType>) =>({type: SET_USERS, users}as const)
export const setCurrentPage = (currentPage: number) =>({type: SET_CURRENT_PAGE, currentPage }as const)
export const setTotalUsersCount = (totalPage: number) =>({type: SET_TOTAL_COUNT, totalPage }as const)
export const toggleIsFetching = (isFetching: boolean) =>({type: TOGGLE_IS_FETCHING, isFetching  }as const)
export const toggleFollowingIsProgress = (isFetching: boolean, userId: number) =>({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}as const)

type ActionType = ReturnType<typeof unfollow> | ReturnType<typeof follow> | ReturnType<typeof setUsers>
| ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleIsFetching>
| ReturnType<typeof toggleFollowingIsProgress>

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
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingIsProgress: action.isFetching
                ?[...state.followingIsProgress, action.userId]
                :state.followingIsProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

export default usersReducer