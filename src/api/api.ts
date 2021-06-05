import * as axios from "axios";
import {ProfileType} from "../components/Profile/ProfileContainer";

const instance = axios.default.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "07c457bc-e742-4380-afc8-e78bc10fd120"
    }
})
export type ThunkLoginType = {
    resultCode: number
    messages: string[],
        data: {
    userId: number
}
}

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(id: number | null) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    follow(id: number | null) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(userId: number | null) {
        return ProfileAPI.getProfile(userId)
    }
}
export const ProfileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number | null) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status})
    },
    savePhoto(file: File){
        const formData = new FormData();
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType){
        return instance.put(`profile`, profile).then(res => res.data);
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => {
                return response
            })
    },
    login(email: string, password: string, rememberMe: boolean = false){
        return instance.post<ThunkLoginType>(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response
            })
    },
    logout(){
        return instance.delete(`auth/login`)
            .then(response => {
                return response
            })
    }
}