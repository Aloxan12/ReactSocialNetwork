import {AppThunk} from "./redux-store";
import {getAuthUsersData} from "./auth-reducer";
import appReducer, {initializedSuccess, InitialStateAuthType} from "./app-reducer";

let state:InitialStateAuthType =  {
    initialized: false
}


test('initialized app',()=>{
    let action = initializedSuccess()

    let newState = appReducer(state, action)
    expect(newState.initialized).toBe(true)
})