import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../../Common/FormsControls/FormsControls";

type PropsType = {

}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

export const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Your post", 'newPostText', [required], Input) }
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'dialogAddMessageForm'})(AddPostForm)