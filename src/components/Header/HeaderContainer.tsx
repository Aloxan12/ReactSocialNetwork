import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUsersData, setAuthUserData} from "../../redux/auth-reducer";
import {RootReduxStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.getAuthUsersData()
    }
    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}
                    getAuthUsersData={this.props.getAuthUsersData} />
        );
    }
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type mapDispatchToPropsType = {
    getAuthUsersData:()=> void
}
export type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType


const mapStateToProps = (state: RootReduxStateType):mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps , {getAuthUsersData})(HeaderContainer);