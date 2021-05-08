import {AnyAction, Dispatch} from "redux";
import {authAPI, ThunkLoginType} from "../api/api";
import {ActionTypes, FormAction} from "redux-form";
import {ThunkDispatch} from "redux-thunk";

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

export const getAuthUsersData = () => {
    return (dispatch: Dispatch) => {
        authAPI.me().then(res => {
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        });
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: ThunkDispatch<InitialStateAuthType, void, AnyAction>) => {
        authAPI.login(email, password, rememberMe)
            .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUsersData())
            }
        });
    }
}
export const logout = () => {
    return (dispatch: ThunkDispatch<InitialStateAuthType, void, AnyAction>) => {
        authAPI.logout()
            .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
    }
}


export default authReducer