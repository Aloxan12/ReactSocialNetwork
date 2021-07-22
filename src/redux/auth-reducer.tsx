import {ResultCodeForCapcthaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import { securityAPI } from "../api/security-api";


let initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null // if null, then captcha is not required
}

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

export const actions = {
    getCaptchaUrlSuccess:(captchaUrl: string )=>({type:'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}}as const),
    setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: "SET_USER_DATA", payload: {id, login, email, isAuth}
    } as const)
}


export const getAuthUsersData = (): ThunkType =>async (dispatch) => {
            let meData = await authAPI.me();
            if (meData.resultCode === ResultCodesEnum.Success) {
                let {id, login, email} = meData.data
                dispatch(actions.setAuthUserData(id, login, email, true))
            }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUsersData())
        }else {
            if (data.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url
            dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }


export const logout = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.logout()
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    }
}

export default authReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType | FormAction>