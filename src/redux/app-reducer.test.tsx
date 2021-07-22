import appReducer, {actions, InitialStateType} from "./app-reducer";

let state:InitialStateType =  {
    initialized: false
}

test('initialized app',()=>{
    let action = actions.initializedSuccess()

    let newState = appReducer(state, action)
    expect(newState.initialized).toBe(true)
})