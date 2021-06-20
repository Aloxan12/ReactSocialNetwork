import React from 'react';
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {actions} from "../../../redux/profile-reducer";

import {RootReduxStateType} from "../../../redux/redux-store";


const mapStateToProps = (state: RootReduxStateType) => {
    return {
        profilePage: state.profilePage,
        posts: state.profilePage.posts,
    }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, RootReduxStateType>(mapStateToProps, {
    addPost: actions.addPostAC
})(MyPosts);

export default MyPostsContainer;