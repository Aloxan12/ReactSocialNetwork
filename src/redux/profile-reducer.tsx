import {ProfileType} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {ProfileAPI, UsersAPI} from "../api/api";



type ActionType = ReturnType<typeof addPostActionCreate> | ReturnType<typeof setUserProfile>
| ReturnType<typeof setStatus>

export type postType = {
    id: number
    message: string
    likeCounts: number
}
export type InitialStatePostType  = {
    posts: Array<postType>
    profile:ProfileType
    status: string
}

export let initialState: InitialStatePostType = {
    posts: [
        {id: 1,message: "Hello, It is my first massage", likeCounts: 15},
        {id: 2, message: "Hello, I am Lesha", likeCounts: 30},
    ],
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
        "lookingForAJobDescription": "не ищу, а дурачусь!!!",
        "fullName": "samurai dimych",
        "userId": 2,
        "photos": {
            "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
            "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
        }
    },
    status: ''
}

export const profileReducer = (state: InitialStatePostType = initialState, action: ActionType):InitialStatePostType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost = action.postMessage
            return {
                ...state,
                posts: [...state.posts, {id: 8, message: newPost, likeCounts: 0}]
        }}
        case "SET_USER_PROFILE":{
            return {
                ...state,
                profile: action.profile
            }
        }
        case "SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state

    }
}

export const addPostActionCreate = (postText: string) => {
    return {
        type: 'ADD-POST',
        postMessage: postText
    } as const
}
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: 'SET_STATUS',
        status
    } as const
}
export const getUserProfile = (userId: number | null) =>(dispatch: Dispatch)=> {
    return UsersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    });
}
export const getStatus = (userId: number | null) =>(dispatch: Dispatch)=> {
    return ProfileAPI.getStatus(userId)
        .then(response => {
        dispatch(setStatus(response.data))
    });
}
export const updateStatus = (status: string) =>(dispatch: Dispatch)=> {
    return ProfileAPI.updateStatus(status)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(setStatus(status))
            }
    });
}

export default profileReducer