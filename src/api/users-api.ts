import { axiosInstance, GetItemsType } from "./api";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return axiosInstance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },
};
