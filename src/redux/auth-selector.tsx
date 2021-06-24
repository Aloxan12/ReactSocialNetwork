import {RootReduxStateType} from "./redux-store";

export const selectIsAuth = (state:RootReduxStateType)=>{
    return state.auth.isAuth
}
export const selectUserCurrent =(state: RootReduxStateType)=>{
    return state.auth.login
}