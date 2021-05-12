import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {RootReduxStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderContainerType> {
    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
        );
    }
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type mapDispatchToPropsType = {
}
export type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType


const mapStateToProps = (state: RootReduxStateType):mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps , {logout})(HeaderContainer);