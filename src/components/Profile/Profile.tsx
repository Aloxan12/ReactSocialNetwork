import React from 'react';
import classes from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";

type ProfilePropsType = {
    profile: ProfileType
}

const Profile = (props: ProfilePropsType) => {
  return (
    <div className={classes.content}>
      <ProfileInfo profile={props.profile}/>
      <MyPostsContainer />
    </div>
  )
}
export default Profile;