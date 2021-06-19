import {ProfileAPI, UsersAPI} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "./types/types";


export type PostType = {
    id: number
    message: string
    likeCounts: number
}

export let initialState = {
    posts: [
        {id: 1,message: "Hello, It is my first massage", likeCounts: 15},
        {id: 2, message: "Hello, I am Lesha", likeCounts: 30},
    ] as Array<PostType>,
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
    } as ProfileType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
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

export const actions = {
    addPostAC: (postText: string) => ({type: 'ADD-POST',postMessage: postText} as const),
    deletePostAC: (postId: number) => ({type: 'REMOVE-POST',postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE',profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS',status} as const),
    savePhotoSuccess: (photo: PhotosType) =>({type: 'SAVE_PHOTO_SUCCESS',photo} as const)
}

export const getUserProfile = (userId: number | null):ThunkType =>async (dispatch)=> {
    const response = await UsersAPI.getProfile(userId)
        dispatch(actions.setUserProfile(response.data))
}
export const getStatus = (userId: number | null):ThunkType =>async (dispatch)=> {
     const response = await ProfileAPI.getStatus(userId)
        dispatch(actions.setStatus(response.data))
}
export const updateStatus = (status: string):ThunkType => async (dispatch)=> {
    try {
        const response = await ProfileAPI.updateStatus(status)
        if(response.data.resultCode === 0){
            dispatch(actions.setStatus(status))
        }
    } catch (error){

    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch)=> {
    const response = await ProfileAPI.savePhoto(file)
            if(response.data.resultCode === 0){
                dispatch(actions.savePhotoSuccess(response.data.photos))
            }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState)=> {
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

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>