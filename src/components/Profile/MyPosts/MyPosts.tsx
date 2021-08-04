import React from 'react';
import classes from "./MyPosts.module.css"
import Post from './Post/Post';
import {actions, PostType} from "../../../redux/profile-reducer";
import {AddPostFormRedux, AddPostFormValuesType} from './AddPostForm/AddPostForm';
import {v1} from "uuid";
import {useDispatch} from "react-redux";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    const dispatch = useDispatch()
    let postsElement =
        [...props.posts]
            .reverse()
            .map(p => {
                const removePost = () => {
                    dispatch(actions.deletePostAC(p.id))
                }
                return <Post message={p.message}
                             key={p.id}
                             likeCounts={p.likeCounts}
                             id={v1()}
                             removeMessage={removePost}
                />
            })

    const addNewMessage = (value: AddPostFormValuesType) => {
        props.addPost(value.newPostText)
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