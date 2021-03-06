import React, {ChangeEvent, FC, useState} from 'react';
import classes from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../redux/types/types";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    isOwner: boolean
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo = React.memo((props: ProfileInfoType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }
    return (
        <div className={classes.content}>
            <div className={classes.photoContainer}>
                <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto}/>
                {props.isOwner &&
                <label className={classes.uploadPhoto}>
                    <span>Upload new photo</span>
                    <input type='file' onChange={onMainPhotoSelected}/>
                </label>
                }
            </div>
            <div className={classes.profileContainer}>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                {editMode ?
                    <ProfileDataForm  initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}
            </div>

        </div>
    )
})
type ProfileDataPropsType =
    {
        profile: ProfileType
        isOwner: boolean
        goToEditMode: () => void
    }
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={classes.formProfile}>
            {isOwner && <div><button onClick={goToEditMode} className={classes.Edit}>Edit</button></div>}
            <div>
                <b>Full name</b>:{profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>:{profile.lookingForAJob}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My prof skill</b>:{profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me</b>:{profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:{
                Object
                    .keys(profile.contacts)
                    .map((key: string) => {
                        return <Contacts key={key} contactTitle={key}
                                         contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })
            }
            </div>
        </div>
    )
}

type ContactsPropsType = { contactTitle: string, contactValue: string }
export const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.contact}><b>{contactTitle}</b>: {contactValue} </div>
    )
}

export default ProfileInfo;