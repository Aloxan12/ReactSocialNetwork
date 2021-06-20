import {InferActionsTypes} from "./redux-store";


type messageType = {
    id: number
    message: string
}
type dialogsType = {
    id: number
    name: string
}

const initialState = {
    messages: [
        { id: 1, message: "Hi"},
        { id: 2, message: "I am here"},
        { id: 3, message: "bye"},
    ] as Array<messageType>,
    dialogs: [
        { id: 1, name: "Alex"},
        { id: 2, name: "Victor"},
        { id: 3, name: "Sasha"},
        { id: 4, name: "Mike"},
        { id: 5, name: "Bob"},
    ] as Array<dialogsType>
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType=>{
    switch (action.type){
        case "ADD-MESSAGE":{
            const message = action.postMessage
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: message}]
            }
        }
        case "REMOVE-MESSAGE":
            return {
                ...state,
                messages: state.messages.filter(m=>m.id != action.messageId)
            }
        case "UPDATE-YOUR-MESSAGE-TEXT":{
            return {
                ...state,
            }
        }
        default:
            return state
    }
}
export const actions = {
    addMessageAC: (messageText:string)=>({type:'ADD-MESSAGE', postMessage: messageText}as const),
    removeMessageAC:(messageId:number)=>({type:'REMOVE-MESSAGE',messageId}as const),
    changeNewMessageTextCreate: (newText:string)=>({type:'UPDATE-YOUR-MESSAGE-TEXT',newText: newText}as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>