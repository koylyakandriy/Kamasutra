import {
  axiosInstance,
  APIResponseType,
  ResultCodeEnum,
  ResultCodeForCaptchaEnum,
} from "./api";

type MyResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  getMyProfile() {
    return axiosInstance
      .get<APIResponseType<MyResponseDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return axiosInstance
      .post<
        APIResponseType<
          LoginResponseDataType,
          ResultCodeEnum | ResultCodeForCaptchaEnum
        >
      >(`auth/login`, {
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
