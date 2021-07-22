import {APIResponseType, ResultCodeForCapcthaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI, LoginResponseDataType, MeResponseDataType} from "../api/auth-api";
import {GetCaptchaUrlResponseType, securityAPI} from "../api/security-api";
import {call, put, takeEvery} from "redux-saga/effects";
import {actions} from "./auth-reducer";


export function* getAuthUsersDataSagaWorker() {
    let meData: APIResponseType<MeResponseDataType> = yield call(authAPI.me);
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data
        yield put(actions.setAuthUserData(id, login, email, true))
    }
}

export function* loginWorkerSaga(action: ReturnType<typeof loginS>) {
    const data: APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCapcthaEnum> = yield call(authAPI.login, action.email, action.password, action.rememberMe, action.captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        yield put(getAuthUsersData())
    } else {
        if (data.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
            // @ts-ignore
            yield put(getCaptchaUrlSagaWorker());
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'some error'
        yield put(stopSubmit('login', {_error: message}))
    }
}

export function* logoutWorkerSaga (){
        const data:APIResponseType = yield call(authAPI.logout)
        if (data.resultCode === ResultCodesEnum.Success) {
            yield put(actions.setAuthUserData(null, null, null, false))
    }
}

export const getAuthUsersData = () => ({type: 'TASKS/GET-USER-DATA-UPDATE'})
export const loginS = (email: string, password: string, rememberMe: boolean, captcha: string) => ({
    type: 'TASKS/LOGIN',
    email,
    password,
    rememberMe,
    captcha
})
export const logoutS = () => ({type: 'TASKS/LOGOUT'})


export function* authWatcherSaga() {
    yield takeEvery('TASKS/GET-USER-DATA-UPDATE', getAuthUsersData)
    yield takeEvery('TASKS/LOGIN', loginWorkerSaga)
    yield takeEvery('TASKS/LOGOUT', logoutWorkerSaga)
}


export function* getCaptchaUrlSagaWorker (){
    const data: GetCaptchaUrlResponseType = yield call(securityAPI.getCaptchaUrl)
    const captchaUrl = data.url
    yield put(actions.getCaptchaUrlSuccess(captchaUrl))
}


