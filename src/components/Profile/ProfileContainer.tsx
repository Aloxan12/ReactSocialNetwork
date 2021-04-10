import React from 'react';
import classes from "./Profile.module.css"
import Profile from './Profile';
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter } from 'react-router-dom';


class ProfileContainer extends React.Component<PropsType>{
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId){
            userId = "2"
        }
            axios.default.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
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
    "mainLink": string | null
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
}
type MapDispatchToPropsType = {
    setUserProfile:(profile: ProfileType)=> void
}
type PathParamType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamType> & ProfileUsersPropsType

export type ProfileUsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps =(state: RootReduxStateType): MapStateToPropsType=>{
    return {profile: state.profilePage.profile}
}

let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithURLDataContainerComponent);