import axios from "axios";
import {UserType} from "../types/types";

export const axiosInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "38e87cb4-6e9e-44c1-be44-639403dfdf5e",
  },
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaISRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};