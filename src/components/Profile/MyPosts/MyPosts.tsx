import React, {ChangeEvent} from 'react';
import classes from "./MyPosts.module.css"
import Post from './Post';
import {postType, profilePageType} from "../../../redux/store";

export type MyPostsType = {
    onAddPost:(newText: string)=> void
    onNewTextChange:(e:ChangeEvent<HTMLTextAreaElement>)=> void
    state: profilePageType
}



const MyPosts = (props: MyPostsType) => {
  let postsElement = props.state.posts.map( p =>
      <Post message={p.message}
            likeCounts={p.likeCounts}
            id={new Date().getTime()} /> )

    let addPost = () =>{
            props.onAddPost('')
        }
    let newTextChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>)=>{
      props.onNewTextChange(e)
  }
  return (
    <div className={classes.postsBlock}>
      <h3>My post</h3>
      <div>
        <div className={classes.addPostAreaBlock}>
          <textarea
                    value={props.state.newPostText}
                    onChange={newTextChangeHandler}
          ></textarea>
        </div>
        <div className={classes.addPostButtonBlock} >
          <button onClick={addPost}>Add Post</button>
        </div>
      </div>
      <div className={classes.posts}>
          {postsElement}
      </div>
    </div>
  )
}
export default MyPosts