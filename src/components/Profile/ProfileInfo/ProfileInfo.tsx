import React from 'react';
import classes from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";

type ProfileInfoType = {
    profile: ProfileType
}

const ProfileInfo = (props: ProfileInfoType) => {
    if(!props.profile){
        return <Preloader />
    }
    return (
        <div className={classes.content}>
            <div>
                <img src="http://www.rosphoto.com/images/u/articles/1511/4-dalius-baranauskas.jpg" alt="photo"
                     className={classes.mainimg}/>
            </div>
            <div>
                {props.profile.userId}!!!
                <img src={props.profile.photos.small}/>
                <h1>Привет, меня зовут {props.profile.fullName}</h1>
                <p> работа: {props.profile.lookingForAJobDescription}</p>
                <p>Все что нужно знать обо мне так это то, что {props.profile.aboutMe}</p>
            </div>
        </div>
    )
}
export default ProfileInfo;