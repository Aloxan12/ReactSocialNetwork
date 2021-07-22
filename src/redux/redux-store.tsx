import {Action, AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';
import {appWatcherSaga} from "./app-sagas";
import {authWatcherSaga} from "./auth-sagas";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage:dialogsReducer,
    navbarPage:navbarReducer,
    users:usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})
const sagaMiddleware = createSagaMiddleware()

export type RootReduxStateType = ReturnType<typeof rootReducer>


let store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
export type StoreReduxType = typeof store

sagaMiddleware.run(rootWatcher)

function* rootWatcher(){
    yield all([appWatcherSaga(), authWatcherSaga()]);
}


export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, RootReduxStateType, unknown, AnyAction>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, RootReduxStateType, unknown, A>

export default store