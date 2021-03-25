import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import {StoreType} from "./store";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage:dialogsReducer,
    navbarPage:navbarReducer,
})

export type RootReduxStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer);
export  type StoreReduxType = typeof store

export default store