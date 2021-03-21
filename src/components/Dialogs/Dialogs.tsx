import React, {ChangeEvent} from 'react'
import classes from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import {
    ActionType,
    addMessageActionCreate,
    changeNewMessageTextCreate,
    dialogsPageType, dialogsType,
    messageType
} from "../../redux/store";
import {StoreReduxType} from "../../redux/redux-store";

type DialogsType = {
    changeNewMessageText:(e:ChangeEvent<HTMLTextAreaElement>)=> void
    state:dialogsPageType
    addMessage:(textMessage: string)=>void
}




const Dialogs = (props: DialogsType ) =>{
    let dialogsElements = props.state.dialogs.map( d =><DialogsItem id={d.id} name={d.name}  /> )
    let messageElements = props.state.messages.map(m => <Message message={m.message} /> )


    let addMessage = () =>{
        props.addMessage('')
            // props.store.dispatch(addMessageActionCreate(props.newMessage))
            // props.store.dispatch(changeNewMessageTextCreate(''))

    }
    let newTextMessageChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.changeNewMessageText(e)
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.massages}>
                {messageElements}
                <div className={classes.addMessage}>
                    <textarea value={props.state.newMessage} onChange={newTextMessageChange}></textarea>
                    <button onClick={addMessage}>AddMessage</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;