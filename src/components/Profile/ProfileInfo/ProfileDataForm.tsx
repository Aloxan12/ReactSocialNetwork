import React from 'react';
import {ContactsType, ProfileType} from "../ProfileContainer";
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import classes from "./ProfileInfo.module.css"
import {reduxForm, InjectedFormProps} from "redux-form";
import style from "../../Common/FormsControls/FormsControls.module.css";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error &&<div className={style.someError}>{error}</div>}
            <div>
                <b>Full name</b>:{createField<ProfileTypeKeys>("Full name", 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>:
                    {createField('','lookingForAJob',[],Input, {type:'checkbox'})}
            </div>
            <div>
                <b>My prof skill</b>:
                {createField('My prof skill','lookingForAJobDescription',[],Textarea)}
            </div>
            <div>
                <b>About me</b>:
                {createField('About me','aboutMe',[],Textarea)}
            </div>
            <div>
                <b>Contacts</b>:{
                Object
                    .keys(profile.contacts)
                    .map((key: string) => {
                        return  <div key={key} className={classes.contact}>
                            {/* todo: create some solution for embedded objects */}
                            <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                        </div>})
            }
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;