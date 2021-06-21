import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUsersData} from "./auth-reducer";
import {FormAction} from "redux-form";

let initialState = {
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: ()=> ({type: "INITIALIZED_SUCCESS"} as const)
}

export const initializedApp = () => (dispatch: any) => {
        let promise = dispatch(getAuthUsersData());
        Promise.all([promise])
            .then(()=>{
                dispatch(actions.initializedSuccess())
            })
}

export default appReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>