import React from 'react';
import classes from "./MyPosts.module.css"
import Post from './Post/Post';
import {PostType} from "../../../redux/profile-reducer";
import {AddPostFormRedux} from './AddPostForm/AddPostForm';

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    let postsElement =
        [...props.posts]
            .reverse()
            .map(p =>
                <Post message={p.message}
                      key={p.id}
                      likeCounts={p.likeCounts}
                      id={new Date().getTime()}/>)

    let addNewMessage = (value: any) => {
        props.addPost(value.newPostBody)
    }
    return (
        <div className={classes.postsBlock}>
            <h3>My post</h3>
            <div>
                <div className={classes.addPostAreaBlock}>
                    <AddPostFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElement}
            </div>
        </div>
    )
}


export default MyPosts