import {InferActionsTypes} from "./redux-store";
import {getAuthUsersData} from "./auth-reducer";

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
            .catch((e) => {
                //go fo pizza
                console.log(e)
            })
            .finally(() => {
                //dispatch(initializedSuccess(error))
            })
}

export default appReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
