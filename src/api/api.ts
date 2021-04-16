import * as axios from "axios";

const instance = axios.default.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "07c457bc-e742-4380-afc8-e78bc10fd120"
    }
})

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}
export const FollowAPI = {
    unfollow(id: number){
        return instance.delete(`follow/${id}`)
            .then(response=>{
                return response.data
            })
    },
    follow(id: number){
        return instance.post(`follow/${id}`)
            .then(response=>{
                return response.data
            })
    }
}
export const getUsers2 = (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
}