import {PhotosType, ProfileType, UserType} from "../redux/types/types";
import {APIResponseType, instance} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const ProfileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number | null) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status}).then(res => res.data)
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append('image', file)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(res => res.data);
    }
}
