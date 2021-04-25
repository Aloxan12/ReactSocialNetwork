import React, {ChangeEvent} from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessageActionCreate, changeNewMessageTextCreate, initialStateDialogsType} from "../../redux/dialogs-reducer";
import { Dispatch } from 'redux';
import {RootReduxStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStateToPropsType = {
    dialogsPage: initialStateDialogsType
}
export type mapStateToPropsForRedirectType = {
    isAuth:boolean
}
type MapDispatchToPropsType = {
    changeNewMessageText:(e:ChangeEvent<HTMLTextAreaElement>)=>void
    addMessage:(newMessage: string)=> void
}
export type DialogsPropsType = MapDispatchToPropsType & MapStateToPropsType & mapStateToPropsForRedirectType

const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType=>{
    return{
        dialogsPage: state.dialogsPage,
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
let AuthRedirectComponent = withAuthRedirect(Dialogs)
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;