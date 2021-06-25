import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const ws = new WebSocket('https://social-network.samuraijs.com/handlers/ChatHandler.ashx')
type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


export const ChatPage: React.FC =()=>{
    return(
        <div>
            <Chat />
        </div>
    )
}

export const Chat: React.FC =()=>{
    return(
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}
export const Messages: React.FC =()=>{
    const [messages, setMessages]= useState<ChatMessageType[]>([])

    useEffect(()=>{
        ws.addEventListener('message', (e)=>{
            setMessages((prevMessages)=> [...prevMessages, ...JSON.parse(e.data)])
        })
    },[])

    return(
        <div style={{height:'400px', overflow: "auto"}}>
            {messages.map((m, index)=><Message key={index} message={m}/>)}
        </div>
    )
}
export const Message: React.FC<{message: ChatMessageType}>=({message})=>{
    return(
        <div>
            <img src={message.photo} style={{width:'30px', borderRadius:'50%'}}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}
export const AddMessageForm: React.FC =()=>{
    return(
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Send</button>
            </div>
        </div>
    )
}
