
import dialogsReducer, {actions, InitialStateType} from "./dialogs-reducer";


let state:InitialStateType =  {
    messages: [
        { id: 1, message: "Hi"},
        { id: 2, message: "I am here"},
        { id: 3, message: "bye"},
    ],
    dialogs: [
        { id: 1, name: "Alex"},
        { id: 2, name: "Victor"},
        { id: 3, name: "Sasha"},
        { id: 4, name: "Mike"},
        { id: 5, name: "Bob"},
    ]
}


test('length of post should be increment',()=>{
    let action = actions.addMessageAC('What?')

    let newState = dialogsReducer(state, action)
    expect(newState.messages.length).toBe(4)
})
test('delete message',()=>{
    let action = actions.removeMessageAC(2)
    let newState = dialogsReducer(state, action)
    expect(newState.messages.length).toBe(2)
})