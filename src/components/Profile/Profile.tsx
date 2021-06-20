import React from 'react';
import classes from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/types/types";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(status: string)=> void
    savePhoto:(file: File)=> void
    saveProfile: (profile: ProfileType) => Promise<any>
    isOwner:boolean
}

const Profile = React.memo((props: ProfilePropsType) => {
  return (
    <div className={classes.content}>
      <ProfileInfo profile={props.profile}
                   savePhoto={props.savePhoto}
                   saveProfile={props.saveProfile}
                   status={props.status}
                   updateStatus={props.updateStatus}
                   isOwner={props.isOwner}/>
      <MyPostsContainer />
    </div>
  )
})
export default Profile;