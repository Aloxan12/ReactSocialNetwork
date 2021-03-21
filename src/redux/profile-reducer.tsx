import {ActionType, postType, profilePageType} from "./store";

let initialState = {
    posts: [
        {id: 1, message: "Hello, It is my first massage", likeCounts: 15},
        {id: 2, message: "Hello, I am Lesha", likeCounts: 30},
    ],
    newPostText: ""
}

const profileReducer = (state: profilePageType = initialState, action: ActionType)=>{
    switch (action.type){
        case "ADD-POST":
            let newPost: postType = {
                id: new Date().getTime(),
                message: action.postMessage,
                likeCounts: 0
            }
            state.posts.push(newPost)
            return state
        case "UPDATE-YOUR-POST-TEXT":
            state.newPostText = action.newText;
            return state
        default: return state
    }
}
const addPostActionCreate =(postText:string)=>{
    return{
        type:'ADD-POST',
        postMessage: postText
    }as const
}
const changeNewTextCreate =(newText:string)=>{
    return{
        type:'UPDATE-YOUR-POST-TEXT',
        newText: newText
    }as const
}

export default profileReducer