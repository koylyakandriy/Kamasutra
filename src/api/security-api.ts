import { axiosInstance } from "./api";

type GetCaptchaUrlType = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl() {
    return axiosInstance
      .get<GetCaptchaUrlType>(`security/get-captcha-url`)
      .then((res) => res.data);
  },
};