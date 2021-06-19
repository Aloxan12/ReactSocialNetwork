import {APIResponseType, instance, ThunkLoginType} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}


export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null){
        return instance.post<ThunkLoginType>(`auth/login`, {email, password, rememberMe, captcha})
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

