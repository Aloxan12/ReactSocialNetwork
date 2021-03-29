import React, {ChangeEvent} from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreate, changeNewTextCreate, InitialStatePostType, postType} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";
import {RootReduxStateType} from "../../../redux/redux-store";

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



type MapStateToPropsType = {
    profilePage: InitialStatePostType
    posts: Array<postType>
    newPostText: string
}
type MapDispatchToProps = {
    onAddPost: (newText: string)=> void,
    onNewTextChange: (e:ChangeEvent<HTMLTextAreaElement>)=> void
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToProps


    const mapStateToProps = (state: RootReduxStateType ): MapStateToPropsType=>{
        return{
            profilePage:state.profilePage,
            posts: state.profilePage.posts,
            newPostText: state.profilePage.newPostText,
        }
    };
    const mapDispatchToProps = (dispatch: Dispatch ): MapDispatchToProps=> {
        return {
            onAddPost: (newText:string) => {
                dispatch(addPostActionCreate(newText))
                dispatch(changeNewTextCreate(''))
            },
            onNewTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
                dispatch(changeNewTextCreate(e.currentTarget.value))
            }
        }
    };

    const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;