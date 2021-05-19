import React, {ChangeEvent} from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostAC, InitialStatePostType, postType} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";
import {RootReduxStateType} from "../../../redux/redux-store";

type MapStateToPropsType = {
    profilePage: InitialStatePostType
    posts: Array<postType>
}
type MapDispatchToProps = {
    onAddPost: (newText: string)=> void,
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToProps


    const mapStateToProps = (state: RootReduxStateType ): MapStateToPropsType=>{
        return{
            profilePage:state.profilePage,
            posts: state.profilePage.posts,
        }
    };
    const mapDispatchToProps = (dispatch: Dispatch ): MapDispatchToProps=> {
        return {
            onAddPost: (newText:string) => {
                dispatch(addPostAC(newText))
            },
        }
    };

    const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;