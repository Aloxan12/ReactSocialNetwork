import React from 'react';
import classes from "./Post.module.css"
import {PostType} from "../../../../redux/profile-reducer";
import {useSelector} from "react-redux";
import userPhoto from '../../../../assets/images/user.png';
import {RootReduxStateType} from "../../../../redux/redux-store";


const Post = React.memo((props: PostType) => {
    const photo = useSelector<RootReduxStateType, string | null | undefined>(state => state.profilePage.profile?.photos.large)

    return (<div className={classes.content}>
            <div className={classes.item}>
                <img src={photo ? photo : userPhoto} alt="" className={classes.avatar}/>
                <div className={classes.like}>
                    <span>Like: </span> {props.likeCounts}
                </div>
            </div>
            <div className={classes.messages}>
                <span className={classes.text}>{props.message}</span>
                <div className={classes.corner}></div>
                <button onClick={props.removeMessage} className={classes.removeBtn}>x</button>
            </div>
        </div>
    )
})
export default Post;