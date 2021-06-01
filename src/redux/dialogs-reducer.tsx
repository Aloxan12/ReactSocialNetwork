
type messageType = {
    id: number
    message: string
}
type dialogsType = {
    id: number
    name: string
}
export type initialStateDialogsType = {
    messages: Array<messageType>
    dialogs:Array<dialogsType>
}
let initialState: initialStateDialogsType = {
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
type ActionType = ReturnType<typeof addMessageAC> | ReturnType<typeof changeNewMessageTextCreate>
| ReturnType<typeof removeMessageAC>

const dialogsReducer = (state: initialStateDialogsType = initialState, action: ActionType): initialStateDialogsType=>{
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
export const addMessageAC =(messageText:string)=>{
    return{
        type:'ADD-MESSAGE',
        postMessage: messageText
    }as const
}
export const removeMessageAC =(messageId:number)=>{
    return{
        type:'REMOVE-MESSAGE',
        messageId
    }as const
}
export const changeNewMessageTextCreate =(newText:string)=>{
    return{
        type:'UPDATE-YOUR-MESSAGE-TEXT',
        newText: newText
    }as const
}
export default dialogsReducer