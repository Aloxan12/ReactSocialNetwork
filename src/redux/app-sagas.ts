import {call, put, takeEvery} from "redux-saga/effects";
import {actions} from "./app-reducer";
import {APIResponseType} from "../api/api";
import {getAuthUsersDataSagaWorker} from "./auth-sagas";



export function* initializeAppWorkerSaga() {
    // @ts-ignore
    let promise: APIResponseType = yield put(getAuthUsersDataSagaWorker());
    try{
        const res: APIResponseType = yield call(Promise.all,[promise])
                yield put(actions.initializedSuccess())
    }
    catch(e){
            console.log(e)
        }
}

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'})

export function* appWatcherSaga(){
    yield takeEvery("APP/INITIALIZE-APP", initializeAppWorkerSaga)
}