import { axiosInstance, APIResponseType } from "./api";

export const followAPI = {
  onFollow(userId: number) {
    return axiosInstance
      .post<APIResponseType>(`follow/${userId}`, {})
      .then((res) => res.data);
  },
  onUnfollow(userId: number) {
    return axiosInstance
      .delete(`follow/${userId}`, {})
      .then((res) => res.data) as Promise<APIResponseType>;
  },
};
