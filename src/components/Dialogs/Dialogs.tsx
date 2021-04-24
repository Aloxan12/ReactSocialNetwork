import React, {ChangeEvent} from 'react'
import classes from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import {DialogsPropsType} from "./DialogsContainer";
import { Redirect } from 'react-router-dom';

// type DialogsType = {
//     changeNewMessageText:(e:ChangeEvent<HTMLTextAreaElement>)=> void
//     state:dialogsPageType
//     addMessage:(textMessage: string)=>void
// }

const Dialogs = (props: DialogsPropsType ) =>{
    let dialogsElements = props.dialogsPage.dialogs.map( d =><DialogsItem id={d.id} name={d.name}  /> )
    let messageElements = props.dialogsPage.messages.map(m => <Message message={m.message} /> )


    let addMessage = () =>{
        props.addMessage('')
            // props.store.dispatch(addMessageActionCreate(props.newMessage))
            // props.store.dispatch(changeNewMessageTextCreate(''))

    }
    let newTextMessageChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.changeNewMessageText(e)
    }
    if (!props.isAuth) return <Redirect to={'/login'} />
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.massages}>
                {messageElements}
                <div className={classes.addMessage}>
                    <textarea value={props.dialogsPage.newMessage} onChange={newTextMessageChange}></textarea>
                    <button onClick={addMessage}>AddMessage</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;