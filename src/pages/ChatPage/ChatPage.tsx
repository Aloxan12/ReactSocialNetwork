import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {ChatMessageAPIType, StatusType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {ChatMessageType, sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
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
            {status === 'error' && <div>Some error.Please refresh page</div>}
            <>
                <Messages/>
                <AddMessageForm/>
            </>
        </div>
    )
}

export const Messages: React.FC = () => {
    const messages = useSelector<RootReduxStateType, ChatMessageType[]>(state => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: '400px', overflow: "auto"}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

export const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})
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
