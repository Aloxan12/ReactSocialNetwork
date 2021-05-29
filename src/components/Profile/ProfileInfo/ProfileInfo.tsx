import React, {ChangeEvent} from 'react';
import classes from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus:(status: string)=> void
    savePhoto:(file: File)=> void
    isOwner: boolean
}

const ProfileInfo = React.memo((props: ProfileInfoType) => {
    if(!props.profile){
        return <Preloader />
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={classes.content}>
            <div>
                <img src="http://www.rosphoto.com/images/u/articles/1511/4-dalius-baranauskas.jpg" alt="photo"
                     className={classes.mainimg}/>
                {props.isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
            </div>
            <div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                {props.profile.userId} - my id!!!
                <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto}/>
                <h1>Привет, меня зовут {props.profile.fullName}</h1>
                <p> работа: {props.profile.lookingForAJobDescription}</p>
                <p>Все что нужно знать обо мне так это то, что {props.profile.aboutMe}</p>
            </div>
        </div>
    )
})
export default ProfileInfo;