import {APIResponseType, instance, ResultCodeForCapcthaEnum, ResultCodesEnum} from "./api";

export type MeResponseDataType = {
    id: number
    email: string
    login: string
}
export type LoginResponseDataType = {
    userId: number
}


export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null){
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCapcthaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    logout(){
        return instance.delete(`auth/login`)
            .then(res => res.data)
    }
}

