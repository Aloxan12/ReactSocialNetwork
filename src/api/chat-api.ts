
let subscribes = {
    'message-received': [] as MessageReceivedSubscribeType[],
    'status-changed': [] as StatusChangedSubscribeType[],
}

let ws: WebSocket | null = null
type EventsNamesType = 'message-received' | 'status-changed'

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e:MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribes['message-received'].forEach(s=>s(newMessage))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh page')
}
const cleanUp = ()=>{
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus =(status: StatusType)=>{
    subscribes['status-changed'].forEach(s=> s(status))
}
function createChannel() {
    cleanUp();
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribes['message-received'] = []
        subscribes['status-changed'] = []
        cleanUp();
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessageReceivedSubscribeType | StatusChangedSubscribeType){
        // @ts-ignore
        subscribes[eventName].push(callback)
        return ()=>{
            // @ts-ignore
            subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageReceivedSubscribeType | StatusChangedSubscribeType){
        // @ts-ignore
        subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}


type MessageReceivedSubscribeType = (messages: ChatMessageAPIType[])=> void
type StatusChangedSubscribeType = (status: StatusType)=> void
export type StatusType = 'pending' | 'ready' | 'error'
export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}