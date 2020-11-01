import { ProfileType, PhotosType } from "../types/types";
import { axiosInstance, APIResponseType } from "./api";

type SavePhotosDataType = {
  photos: PhotosType;
};

export const profileAPI = {
  getProfile(id: number) {
    return axiosInstance
      .get<ProfileType>(`profile/${id}`)
      .then((res) => res.data);
  },
  getStatus(id: number) {
    return axiosInstance
      .get<string>(`profile/status/${id}`)
      .then((res) => res.data);
  },
  updateStatus(status: string) {
    return axiosInstance
      .put<APIResponseType>(`profile/status`, { status })
      .then((res) => res.data);
  },
  savePhoto(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    return axiosInstance
      .put<APIResponseType<SavePhotosDataType>>(`profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },
  saveProfile(profile: ProfileType) {
    return axiosInstance
      .put<APIResponseType>(`profile`, profile)
      .then((res) => res.data);
  },
};
