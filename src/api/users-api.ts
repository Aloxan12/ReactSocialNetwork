import {APIResponseType, GetItemsType, instance} from "./api";
import {ProfileAPI} from "./profile-api";


export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    unfollow(id: number | null) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data) as Promise<APIResponseType>
    },
    follow(id: number | null) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile(userId: number | null) {
        return ProfileAPI.getProfile(userId)
    }
}
