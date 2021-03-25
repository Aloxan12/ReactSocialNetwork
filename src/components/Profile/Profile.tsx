import React from 'react';
import classes from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profilePageType} from "../../redux/store";


export type ProfileType = {
    state: profilePageType
}

const Profile = (props: ProfileType) => {

  return (
    <div className={classes.content}>
      <ProfileInfo />
      <MyPostsContainer />
    </div>
  )
}
export default Profile;