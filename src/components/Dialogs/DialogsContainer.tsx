import React, {ChangeEvent} from 'react'
import classes from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import {ActionType,addMessageActionCreate,changeNewMessageTextCreate,dialogsPageType} from "../../redux/store";
import store, {StoreReduxType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

type DialogsType = {
}

// const DialogsContainer = (props: DialogsType ) =>{
//
//     return (
//         // <StoreContext.Consumer>{(store)=>{
//         //     let state = store.getState().dialogsPage
//         //
//         //     let addMessage = () =>{
//         //         store.dispatch(addMessageActionCreate(state.newMessage))
//         //         store.dispatch(changeNewMessageTextCreate(''))
//         //
//         //     }
//         //     let newTextMessageChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
//         //         store.dispatch(changeNewMessageTextCreate(e.currentTarget.value))
//         //     }
//         //     return <Dialogs
//         //         changeNewMessageText={newTextMessageChange}
//         //         state={state}
//         //         addMessage={addMessage}
//         //     />
//         // }}
//         // </StoreContext.Consumer>
//     );
// }


const mapStateToProps = (state: dialogsPageType)=>{
    return{
        dialogsPage: state
    }
}
const mapDispatchToProps = (dispatch: any)=>{
    return{
        changeNewMessageText:(e:ChangeEvent<HTMLTextAreaElement>)=>{
            dispatch(changeNewMessageTextCreate(e.currentTarget.value))
        },
        addMessage:(newMessage: string)=>{
            dispatch(addMessageActionCreate(newMessage))
            dispatch(changeNewMessageTextCreate(''))
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;