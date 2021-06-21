import * as axios from "axios";
import {UserType} from "../redux/types/types";

export const instance = axios.default.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "07c457bc-e742-4380-afc8-e78bc10fd120"
    }
})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}


