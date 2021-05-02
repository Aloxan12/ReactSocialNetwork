import React from 'react';
import classes from "./Profile.module.css"
import Profile from './Profile';
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "16180"
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <div className={classes.content}>
                <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
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
    status: string
}
type MapDispatchToPropsType = {
    getUserProfile:(userId: string)=> void
    getStatus:(userId: string)=> void
    updateStatus:(status: string)=> void
}
type PathParamType = {
    userId: string
}
export type ProfilePropsType = RouteComponentProps<PathParamType> & ProfileUsersPropsType

export type ProfileUsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps =(state: RootReduxStateType): MapStateToPropsType=>{
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}
let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
let WithURLDataContainerComponent = withRouter(AuthRedirectComponent);

compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile, getStatus, updateStatus})(WithURLDataContainerComponent);