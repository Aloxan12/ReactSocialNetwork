import React from 'react';
import classes from "./Profile.module.css"
import Profile from './Profile';
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to='/login'/>
        return (
            <div className={classes.content}>
                <Profile profile={this.props.profile}/>
            </div>
        )
    }
}

type ContactsType = {
    "facebook": string | null,
    "website": string | null,
    "vk": string | null,
    "twitter": string | null,
    "instagram": string | null,
    "youtube": string | null,
    "github": string | null,
    "mainLink": string | null,
}
type PhotoType = {
    small: string | undefined
    large: string | undefined
}
export type ProfileType = {
    "aboutMe": string | null,
    "contacts": ContactsType,
    "lookingForAJob": boolean | null,
    "lookingForAJobDescription": string | null,
    "fullName": string | null,
    "userId": number | null,
    "photos": PhotoType
}


type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile:(userId: string)=> void
}
type PathParamType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamType> & ProfileUsersPropsType

export type ProfileUsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps =(state: RootReduxStateType): MapStateToPropsType=>{
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}
let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
let WithURLDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);