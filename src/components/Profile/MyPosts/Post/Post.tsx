import React from 'react';
import classes from "./Post.module.css"
import {PostType} from "../../../../redux/profile-reducer";


const Post = React.memo((props: PostType) => {
  return (<div className={classes.content}>
    <div className={classes.item}>
      <img src="https://i.pinimg.com/564x/e7/99/2f/e7992f29c5f2f4fc61692299f4b30bbc.jpg" alt="" />
          {props.message}
          <div>
              <span>like </span> {props.likeCounts}
          </div>
          </div>
  </div>
  )
})
export default Post;