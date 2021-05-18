import React from 'react'
import classes from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import {DialogsPropsType} from "./DialogsContainer";
import AddMessageForm, { NewMessageFormValuesType} from "./AddMessageForm/AddMessageForm";

const Dialogs = React.memo((props: DialogsPropsType ) =>{
    let dialogsElements = props.dialogsPage.dialogs.map( d =><DialogsItem id={d.id} name={d.name}  /> )
    let messageElements = props.dialogsPage.messages.map(m => <Message message={m.message} /> )


    let addNewMessage = (value: NewMessageFormValuesType)=>{
        props.addMessage(value.newMessageBody)
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.massages}>
                {messageElements}
                <div className={classes.addMessage}>
                    <AddMessageForm onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    );
})

export default Dialogs;