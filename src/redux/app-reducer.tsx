import {AppThunk} from "./redux-store";
import {getAuthUsersData} from "./auth-reducer";


export const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

type ActionType = ReturnType<typeof initializedSuccess>

export type InitialStateAuthType = {
    initialized: boolean
}

let initialState: InitialStateAuthType = {
    initialized: false
}

export const appReducer = (state: InitialStateAuthType = initialState, action: ActionType): InitialStateAuthType => {
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
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)
export const initializedApp = ():AppThunk => {
    return (dispatch) => {
        let promise = dispatch(getAuthUsersData());
        Promise.all([promise])
            .then(()=>{
                dispatch(initializedSuccess())
            })
    }
}



export default appReducer