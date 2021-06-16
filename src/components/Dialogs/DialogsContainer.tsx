import React, {ChangeEvent} from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessageAC, initialStateType} from "../../redux/dialogs-reducer";
import {compose, Dispatch} from 'redux';
import {RootReduxStateType} from "../../redux/redux-store";
import {mapStateToPropsForRedirectType, withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStateToPropsType = {
    dialogsPage: initialStateType
}
type MapDispatchToPropsType = {
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
        addMessage:(newMessage: string)=>{
            dispatch(addMessageAC(newMessage))
        }
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);