import React from 'react';
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {RootReduxStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        axios.default.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if(response.data.resultCode === 0){
                    let {id,login,email} = response.data.data
                    this.props.setAuthUserData(id,login,email)
                }
            });
    }
    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth} setAuthUserData={this.props.setAuthUserData} />
        );
    }
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type mapDispatchToPropsType = {
    setAuthUserData:(id: number | null,login: string | null,email: string | null)=>void
}
export type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType


const mapStateToProps = (state: RootReduxStateType):mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps , {setAuthUserData})(HeaderContainer);