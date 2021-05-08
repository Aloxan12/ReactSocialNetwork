import React, {ChangeEvent} from 'react'
import classes from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


const Dialogs = (props: DialogsPropsType ) =>{
    let dialogsElements = props.dialogsPage.dialogs.map( d =><DialogsItem id={d.id} name={d.name}  /> )
    let messageElements = props.dialogsPage.messages.map(m => <Message message={m.message} /> )


    let addNewMessage = (value: any)=>{
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
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                    {/*<textarea value={props.dialogsPage.newMessage}*/}
                    {/*          onChange={newTextMessageChange}*/}
                    {/*></textarea>*/}
                    {/*<button onClick={addMessage}>AddMessage</button>*/}
                </div>
            </div>
        </div>
    );
}

type FormDataType = {
    textarea: string
}

export const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name={'newMessageBody'} placeholder={'Enter your message'}/>
            </div>
            <div><button>Send</button></div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<FormDataType>({form:'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs;