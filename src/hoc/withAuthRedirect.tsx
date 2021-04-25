import React from "react";
import {Redirect} from "react-router-dom";
import Dialogs from "../components/Dialogs/Dialogs";
import {RootReduxStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {mapStateToPropsForRedirectType} from "../components/Dialogs/DialogsContainer";


let mapStateToPropsForRedirect = (state: RootReduxStateType): mapStateToPropsForRedirectType=>{
    return{
        isAuth: state.auth.isAuth
    }
}

export let withAuthRedirect = (Component: any)=>{
    class RedirectComponent extends React.Component<any, any>{
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />

            return <Component {...this.props} />
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}