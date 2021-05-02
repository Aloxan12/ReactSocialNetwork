import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import Dialogs from "../components/Dialogs/Dialogs";
import {RootReduxStateType} from "../redux/redux-store";
import {connect} from "react-redux";

export type mapStateToPropsForRedirectType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: RootReduxStateType): mapStateToPropsForRedirectType=>{
    return{
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>){
    const RedirectComponent =( props: mapStateToPropsForRedirectType) =>{
            let {isAuth, ...restProps} = props
            if (!isAuth) return <Redirect to={'/login'} />

            return <Component {...restProps as T} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}