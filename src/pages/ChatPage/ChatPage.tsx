import React, {ChangeEvent, useEffect, useState} from "react";


type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatPage

export const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            createChannel()
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener("close", closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            setWsChannel(ws)
            ws?.addEventListener('close', closeHandler)
        }

        createChannel();
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])
    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}
export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e:MessageEvent) => {
            const newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        }
        wsChannel?.addEventListener('message', messageHandler)
        return ()=>{
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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
export const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea value={message} onChange={onChange}></textarea>
            </div>
            <div>
                <button disabled={wsChannel == null && readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
