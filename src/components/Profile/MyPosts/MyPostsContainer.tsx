import React, {ChangeEvent} from 'react';
import classes from "./MyPosts.module.css"
import Post from './Post';
import {
    addPostActionCreate,
    changeNewTextCreate,
    profilePageType
} from "../../../redux/store";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {StoreReduxType} from "../../../redux/redux-store";

export type MyPostsContainerType = {
}


    //const MyPostsContainer = (props: MyPostsContainerType) => {
    // return (
    //     <StoreContext.Consumer>{(store)=>{
    //         let state = store.getState().profilePage
    //         let addPost = () => {
    //             store.dispatch(addPostActionCreate(state.newPostText))
    //             store.dispatch(changeNewTextCreate(''))
    //         }
    //         let newTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //             store.dispatch(changeNewTextCreate(e.currentTarget.value))
    //         }
    //         return <MyPosts onAddPost={addPost}
    //                  onNewTextChange={newTextChange}
    //                  posts={state.posts}
    //                  newPostText={state.newPostText}
    //         />
    //     }}
    //     </StoreContext.Consumer>
    // )
    const mapStateToProps = (state: profilePageType)=>{
        return{
            profilePage:state,
            posts: state.posts,
            newPostText: state.newPostText,
        }
    };
    const mapDispatchToProps = (dispatch: any)=> {
        return {
            onAddPost: (newPostText: string) => {
                dispatch(addPostActionCreate(newPostText))
                dispatch(changeNewTextCreate(''))
            },
            onNewTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
                dispatch(changeNewTextCreate(e.currentTarget.value))
            }
        }
    };

    const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;