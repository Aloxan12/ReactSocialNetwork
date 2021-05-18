import React from 'react'
import classes from './../Dialogs.module.css'



type MessageType = {
    message: string
}
const Message = React.memo((props:MessageType)=>{
    return (
        <div className={classes.massage}>{props.message}</div>
    )
})
export default Message;