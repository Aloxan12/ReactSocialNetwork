import {instance} from "./api";


export type GetCaptchaUrlResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<Promise<GetCaptchaUrlResponseType>>(`security/get-captcha-url`).then(res => res.data)
    }
}


