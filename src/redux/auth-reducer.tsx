import {Dispatch} from "redux";
import {authAPI} from "../api/api";

export const SET_USER_DATA = "SET_USER_DATA"
export const UNFOLLOW = "UNFOLLOW"


export const setAuthUserData = (id: number | null, login: string | null, email: string | null) => ({
    type: SET_USER_DATA, data: {id, login, email}
} as const)


type ActionType = ReturnType<typeof setAuthUserData>

export type InitialStateAuthType = {
    id: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean
    isFetching: boolean
}

let initialState: InitialStateAuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
}

export const authReducer = (state: InitialStateAuthType = initialState, action: ActionType): InitialStateAuthType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const getAuthUsersData = () => {
    return (dispatch: Dispatch) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                dispatch(setAuthUserData(id, login, email))
            }
        });
    }
}

export default authReducer