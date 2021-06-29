import React, {ChangeEvent, useEffect, useState} from "react";
import {ChatMessageType, StatusType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {RootReduxStateType} from "../../redux/redux-store";


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatPage

export const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector<RootReduxStateType, StatusType>(state => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    },)

    return (
        <div>
            {status === 'error' ? <div>Some error.Please refresh page</div> :
                <>
                    <Messages/>
                    <AddMessageForm/>
                </>}
        </div>
    )
}
export const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector<RootReduxStateType, ChatMessageType[]>(state => state.chat.messages)
    return (
        <div style={{height: '400px', overflow: "auto"}}>ф
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}
export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}
export const AddMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector<RootReduxStateType, StatusType>(state => state.chat.status)

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea value={message} onChange={onChange}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}
