import {AppThunk} from "./redux-store";
import {getAuthUsersData} from "./auth-reducer";


export const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

type ActionType = ReturnType<typeof initializedSuccess>

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():initializedSuccessActionType => ({type: INITIALIZED_SUCCESS} as const)

export const initializedApp = () => (dispatch: any) => {
        let promise = dispatch(getAuthUsersData());
        Promise.all([promise])
            .then(()=>{
                dispatch(initializedSuccess())
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