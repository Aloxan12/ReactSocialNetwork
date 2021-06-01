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