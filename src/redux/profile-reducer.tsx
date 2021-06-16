import {ProfileAPI, UsersAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "./types/types";



type ActionType = ReturnType<typeof addPostAC> | ReturnType<typeof setUserProfile>
| ReturnType<typeof setStatus> | deletePostActionType | ReturnType<typeof savePhotoSuccess>

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
            "website": '',
            "vk": "vk.com/dimych",
            "twitter": "https://twitter.com/@sdf",
            "instagram": "instagra.com/sds",
            "youtube": '',
            "github": "github.com",
            "mainLink": ''
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
        case "REMOVE-POST":
            return {
            ...state,
            posts: state.posts.filter(p=> p.id != action.postId)
        }
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
        case "SAVE_PHOTO_SUCCESS":{
            return {...state, profile:{...state.profile, photos: action.photo}as ProfileType}
        }
        default:
            return state

    }
}
type addPostActionType = {type: 'ADD-POST', postMessage: string}
export const addPostAC = (postText: string):addPostActionType => {
    return {
        type: 'ADD-POST',
        postMessage: postText
    } as const
}
type deletePostActionType = {type: 'REMOVE-POST',postId: number}
export const deletePostAC = (postId: number):deletePostActionType => {
    return {
        type: 'REMOVE-POST',
        postId
    } as const
}
type setUserProfileActionType = {type: 'SET_USER_PROFILE',profile: ProfileType}
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}
type setStatusActionType = {type: 'SET_STATUS',status: string}
export const setStatus = (status: string):setStatusActionType => {
    return {
        type: 'SET_STATUS',
        status
    } as const
}
type savePhotoSuccessType = {type: 'SAVE_PHOTO_SUCCESS',photo:PhotosType}
export const savePhotoSuccess = (photo: PhotosType):savePhotoSuccessType => {
    return {
        type: 'SAVE_PHOTO_SUCCESS',
        photo
    } as const
}


export const getUserProfile = (userId: number | null):AppThunk =>async (dispatch)=> {
    const response = await UsersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number | null):AppThunk =>async (dispatch)=> {
     const response = await ProfileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}
export const updateStatus = (status: string):AppThunk => async (dispatch)=> {
    try {
        const response = await ProfileAPI.updateStatus(status)
        if(response.data.resultCode === 0){
            dispatch(setStatus(status))
        }
    } catch (error){

    }
}
export const savePhoto = (file: File): AppThunk => async (dispatch)=> {
    const response = await ProfileAPI.savePhoto(file)
            if(response.data.resultCode === 0){
                dispatch(savePhotoSuccess(response.data.photos))
            }
}

export const saveProfile = (profile: ProfileType): AppThunk => async (dispatch, getState)=> {
    const userId = getState().auth.id
    const data = await ProfileAPI.saveProfile(profile)
    if(data.resultCode === 0){
        if(userId != null){
        dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer