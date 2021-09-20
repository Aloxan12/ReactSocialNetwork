import {Action, AnyAction, applyMiddleware, combineReducers, createStore, compose} from "redux";
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



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
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

let preloadedState;
const persistedTodosString = localStorage.getItem('app-state')
if(persistedTodosString){
    preloadedState = JSON.parse(persistedTodosString)
}


const store = createStore(rootReducer,preloadedState, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

store.subscribe(()=>{
    localStorage.setItem('app-state', JSON.stringify(store.getState()))
    localStorage.setItem('posts', JSON.stringify(store.getState().profilePage.posts))
})


sagaMiddleware.run(rootWatcher)

function* rootWatcher(){
    yield all([appWatcherSaga(), authWatcherSaga()]);
}

export type RootReduxStateType = ReturnType<typeof rootReducer>

export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, RootReduxStateType, unknown, AnyAction>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, RootReduxStateType, unknown, A>

export default store
