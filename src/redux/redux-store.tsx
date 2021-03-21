import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import {StoreType} from "./store";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage:dialogsReducer,
    navbarPage:navbarReducer,
})

export type RootReduxStateType = ReturnType<typeof reducers>

let store = createStore(reducers);
export  type StoreReduxType = typeof store

export default store