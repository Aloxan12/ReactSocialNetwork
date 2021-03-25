import {ActionType} from "./store";

export const addPostActionCreate = (postText: string) => {
    return {
        type: 'ADD-POST',
        postMessage: postText
    } as const
}
export const changeNewTextCreate = (newText: string) => {
    return {
        type: 'UPDATE-YOUR-POST-TEXT',
        newText: newText
    } as const
}
type postType = {
    id: number
    message: string
    likeCounts: number
}
export type InitialStatePostType  = {
    posts: Array<postType>
    newPostText: string
}

let initialState: InitialStatePostType = {
    posts: [
        {id: 1, message: "Hello, It is my first massage", likeCounts: 15},
        {id: 2, message: "Hello, I am Lesha", likeCounts: 30},
    ],
    newPostText: ""
}

export const profileReducer = (state: InitialStatePostType = initialState, action: ActionType):InitialStatePostType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost = state.newPostText
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 8, message: newPost, likeCounts: 0}]

            // let newPost: postType = {
            //     id: new Date().getTime(),
            //     message: action.postMessage,
            //     likeCounts: 0
            // const stateCopy = {...state}
            // stateCopy.posts = [...state.posts]
            // stateCopy.posts.push(newPost)
            // stateCopy.newPostText = ''
            // return stateCopy
        }}
        case "UPDATE-YOUR-POST-TEXT": {
            return {
                ...state,
                newPostText: action.newText
            }
            // const stateCopy = {...state}
            // stateCopy.posts = [...stateCopy.posts]
            // stateCopy.newPostText = action.newText;
            // return stateCopy
        }
        default:
            return state

    }
}

export default profileReducer