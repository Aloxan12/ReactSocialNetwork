import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppThunk} from "./redux-store";

export const SET_USER_DATA = "SET_USER_DATA"
export const UNFOLLOW = "UNFOLLOW"


export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA, payload: {id, login, email, isAuth}
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
                ...action.payload,
            }
        default:
            return state
    }
}

export const getAuthUsersData = ():AppThunk => {
    return (dispatch) => {
        authAPI.me().then(res => {
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        });
    }
}
export const login = (email: string, password: string, rememberMe: boolean):AppThunk => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUsersData())
            }else {
                let message = res.data.messages.length > 0? res.data.messages[0] : 'some error'
                dispatch(stopSubmit('login',{_error: message}))
            }
        });
    }
}
export const logout = ():AppThunk => {
    return (dispatch) => {
        authAPI.logout()
            .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
    }
}


export default authReducer