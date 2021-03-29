import React, {ChangeEvent} from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessageActionCreate, changeNewMessageTextCreate, initialStateDialogsType} from "../../redux/dialogs-reducer";
import { Dispatch } from 'redux';

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

type MapStateToPropsType = {
    dialogsPage: initialStateDialogsType
}
type MapDispatchToPropsType = {
    changeNewMessageText:(e:ChangeEvent<HTMLTextAreaElement>)=>void
    addMessage:(newMessage: string)=> void
}
export type DialogsPropsType = MapDispatchToPropsType & MapStateToPropsType
const mapStateToProps = (state: MapStateToPropsType)=>{
    return{
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType=>{
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