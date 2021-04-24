import {ProfileType} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {UsersAPI} from "../api/api";


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
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}
export const getUserProfile = (userId: string) =>(dispatch: Dispatch)=> {
    return UsersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    });
}
type ActionType = ReturnType<typeof addPostActionCreate> | ReturnType<typeof changeNewTextCreate> | ReturnType<typeof setUserProfile>

export type postType = {
    id: number
    message: string
    likeCounts: number
}
export type InitialStatePostType  = {
    posts: Array<postType>
    newPostText: string
    profile:ProfileType
}

export let initialState: InitialStatePostType = {
    posts: [
        {id: 1,message: "Hello, It is my first massage", likeCounts: 15},
        {id: 2, message: "Hello, I am Lesha", likeCounts: 30},
    ],
    newPostText: "",
    profile:{
        "aboutMe": "я круто чувак 1001%",
        "contacts": {
            "facebook": "facebook.com",
            "website": null,
            "vk": "vk.com/dimych",
            "twitter": "https://twitter.com/@sdf",
            "instagram": "instagra.com/sds",
            "youtube": null,
            "github": "github.com",
            "mainLink": null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "не ищу, а дурачусь",
        "fullName": "samurai dimych",
        "userId": 2,
        "photos": {
            "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
            "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
        }
    }
}

export const profileReducer = (state: InitialStatePostType = initialState, action: ActionType):InitialStatePostType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost = state.newPostText
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 8, message: newPost, likeCounts: 0}]
        }}
        case "UPDATE-YOUR-POST-TEXT": {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case "SET_USER_PROFILE":{
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state

    }
}

export default profileReducer