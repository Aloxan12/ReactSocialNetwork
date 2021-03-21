import {ActionType, dialogsPageType, StateType} from "./store";

type messageType = {
    id: number
    message: string
}
type dialogsType = {
    id: number
    name: string
}
type initialStateType = {
    messages: Array<messageType>
    dialogs:Array<dialogsType>
    newMessage: string
}
let initialState: initialStateType = {
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
    ],
    newMessage:'Hello'
}

const dialogsReducer = (state: dialogsPageType = initialState, action: ActionType)=>{
    switch (action.type){
        case "ADD-MESSAGE":
            let newMessage: messageType = {
                id: new Date().getTime(),
                message: action.postMessage,
            }
            state.messages.push(newMessage)
            return state
        case "UPDATE-YOUR-MESSAGE-TEXT":
            state.newMessage = action.newText;
            return state
        default:
            return state
    }
}
const addMessageActionCreate =(messageText:string)=>{
    return{
        type:'ADD-MESSAGE',
        postMessage: messageText
    }as const
}
const changeNewMessageTextCreate =(newText:string)=>{
    return{
        type:'UPDATE-YOUR-MESSAGE-TEXT',
        newText: newText
    }as const
}
export default dialogsReducer