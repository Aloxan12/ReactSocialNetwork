
let subscribes = [] as Array<SubscribeType>

let ws: WebSocket | null = null

const closeHandler = () => {
    createChannel()
    setTimeout(createChannel, 3000)
}
const messageHandler = (e:MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribes.forEach(s=>s(newMessage))
}
function createChannel() {
    ws?.removeEventListener("close", closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribes = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscribeType){
        subscribes.push(callback)
        return ()=>{
            subscribes.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscribeType){
        subscribes.filter(s => s !== callback)
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}


type SubscribeType = (messages: ChatMessageType[])=> void
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}