
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
    newMessage: string
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
    ] as Array<dialogsType>,
    newMessage:'Hello'
}
type ActionType = ReturnType<typeof addMessageActionCreate> | ReturnType<typeof changeNewMessageTextCreate>

const dialogsReducer = (state: initialStateDialogsType = initialState, action: ActionType): initialStateDialogsType=>{
    switch (action.type){
        case "ADD-MESSAGE":{
            const message = state.newMessage
            return {
                ...state,
                newMessage: '',
                messages: [...state.messages, {id: 6, message: message}]
            }

            // let newMessage: messageType = {
            //     id: new Date().getTime(),
            //     message: action.postMessage,
            // }
            // const stateCopy = {...state}
            // stateCopy.messages = [...state.messages]
            // stateCopy.messages.push(newMessage)
            // return stateCopy
        }
        case "UPDATE-YOUR-MESSAGE-TEXT":{
            return {
                ...state,
                newMessage: action.newText
            }
            // const stateCopy = {...state}
            // stateCopy.messages = [...stateCopy.messages]
            // stateCopy.newMessage = action.newText;
            // return stateCopy
        }
        default:
            return state
    }
}
export const addMessageActionCreate =(messageText:string)=>{
    return{
        type:'ADD-MESSAGE',
        postMessage: messageText
    }as const
}
export const changeNewMessageTextCreate =(newText:string)=>{
    return{
        type:'UPDATE-YOUR-MESSAGE-TEXT',
        newText: newText
    }as const
}
export default dialogsReducer