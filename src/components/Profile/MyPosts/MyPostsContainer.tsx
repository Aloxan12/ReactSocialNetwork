import React, {ChangeEvent} from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {InitialStateType, PostType, actions} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";
import {RootReduxStateType} from "../../../redux/redux-store";

type MapStateToPropsType = {
    profilePage: InitialStateType
    posts: Array<PostType>
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
                dispatch(actions.addPostAC(newText))
            },
        }
    };

    const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;