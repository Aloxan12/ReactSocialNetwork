import {authAPI, ResultCodeForCapcthaEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppThunk} from "./redux-store";

export const SET_USER_DATA = "SET_USER_DATA"
export const UNFOLLOW = "UNFOLLOW"

type setAuthUserPayloadActionType = {
    id:number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserPayloadActionType
}

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA, payload: {id, login, email, isAuth}
} as const)


type getCaptchaUrlSuccessActionType = {
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: {captchaUrl: string},
}
export const getCaptchaUrlSuccess =(captchaUrl: string ): getCaptchaUrlSuccessActionType=>({type:'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}}as const)

type ActionType = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlSuccess>

export type InitialStateAuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    isFetching: boolean
    captchaUrl: string | null
}

let initialState: InitialStateAuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null // if null, then captcha is not required
}

export const authReducer = (state: InitialStateAuthType = initialState, action: ActionType): InitialStateAuthType => {
    switch (action.type) {
        case "SET_USER_DATA":
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const getAuthUsersData = (): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await authAPI.me();
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        } catch (e) {
            console.log(e)
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk => {
    return async (dispatch) => {
        const res = await authAPI.login(email, password, rememberMe, captcha)
        if (res.data.resultCode === 0) {
            dispatch(getAuthUsersData())
        }else {
            if (res.data.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
}
export const getCaptchaUrl = (): AppThunk => async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url
            dispatch(getCaptchaUrlSuccess(captchaUrl))
    }


export const logout = (): AppThunk => {
    return async (dispatch: any) => {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}


export default authReducer