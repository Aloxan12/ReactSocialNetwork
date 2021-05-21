import React from 'react';
import classes from "./MyPosts.module.css"
import Post from './Post';
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";



const MyPosts = React.memo((props: MyPostsPropsType) => {
  let postsElement = props.profilePage.posts.map( p =>
      <Post message={p.message}
            likeCounts={p.likeCounts}
            id={new Date().getTime()} /> )

    let addNewMessage = (value: any)=>{
        props.onAddPost(value.newPostBody)
    }
  return (
    <div className={classes.postsBlock}>
      <h3>My post</h3>
      <div>
        <div className={classes.addPostAreaBlock}>
            <AddPostFormRedux onSubmit={addNewMessage} />
        {/*  <textarea*/}
        {/*            value={props.profilePage.newPostText}*/}
        {/*            onChange={newTextChangeHandler}*/}
        {/*  ></textarea>*/}
        {/*</div>*/}
        {/*<div className={classes.addPostButtonBlock} >*/}
        {/*  <button onClick={addPost}>Add Post</button>*/}
        </div>
      </div>
      <div className={classes.posts}>
          {postsElement}
      </div>
    </div>
  )
})

type FormDataType = {
    textarea: string
}

const maxLength30 = maxLengthCreator(30)

export const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newPostBody'}
                       placeholder={'Enter your message'}
                       validate={[required, maxLength30]}
                />
            </div>
            <div><button>Send</button></div>
        </form>
    )
}
const AddPostFormRedux = reduxForm<FormDataType>({form:'dialogAddMessageForm'})(AddPostForm)
export default MyPosts