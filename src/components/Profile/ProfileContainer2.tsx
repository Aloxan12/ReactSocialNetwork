import React from 'react';
import classes from "./Profile.module.css"
import Profile from './Profile';
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../redux/types/types";


type MapDispatchToPropsType = {
    getUserProfile:(userId: number | null)=> void
    getStatus:(userId: number | null)=> void
    updateStatus:(status: string)=> void
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto:(file: File)=> void
}
type PathParamType = {
    userId: string
}

type MapStateToPropsType =  ReturnType<typeof mapStateToProps>

type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamType>

const ProfileContainer2: React.FC<PropsType>=(props)=> {

        let userId: number | null = +props.match.params.userId
        if (!userId) {
            userId = props.authorizedUserId
            if(!userId){
                props.history.push("/login")
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            props.getUserProfile(userId)
            props.getStatus(userId)
        }

        return (
            <div className={classes.content}>
                <Profile {...props}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}
                         isOwner={!props.match.params.userId}
                />
            </div>
        )
}


const mapStateToProps =(state: RootReduxStateType)=>{
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer2)