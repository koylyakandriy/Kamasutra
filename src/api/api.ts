import axios from "axios";
import { ProfileType } from "../types/types";

const axiosInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "38e87cb4-6e9e-44c1-be44-639403dfdf5e",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`);
  },
};

export const profileAPI = {
  getProfile(id: number) {
    return axiosInstance.get(`profile/${id}`);
  },
  getStatus(id: number) {
    return axiosInstance.get(`profile/status/${id}`);
  },
  updateStatus(status: string) {
    return axiosInstance.put(`profile/status`, { status });
  },
  savePhoto(file: any) {
    const formData = new FormData();
    formData.append("image", file);
    return axiosInstance.put(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  saveProfile(profile: ProfileType) {
    return axiosInstance.put(`profile`, profile);
  },
};

export const followAPI = {
  onFollow(userId: number) {
    return axiosInstance.post(`follow/${userId}`, {});
  },
  onUnfollow(userId: number) {
    return axiosInstance.delete(`follow/${userId}`, {});
  },
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaISRequired = 10,
}

type GetMyProfileResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { userId: number };
  resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum;
  messages: Array<string>;
};

export const authAPI = {
  getMyProfile() {
    return axiosInstance
      .get<GetMyProfileResponseType>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return axiosInstance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return axiosInstance.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return axiosInstance.get(`security/get-captcha-url`);
  },
};
