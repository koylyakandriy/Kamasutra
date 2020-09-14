import axios from "axios";

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
  getProfile(id) {
    return axiosInstance.get(`profile/${id}`);
  },
  getStatus(userId) {
    return axiosInstance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return axiosInstance.put(`profile/status`, { status });
  },
};

export const followAPI = {
  onFollow(userId) {
    return axiosInstance.post(`follow/${userId}`, {});
  },
  onUnfollow(userId) {
    return axiosInstance.delete(`follow/${userId}`, {});
  },
};

export const authAPI = {
  getMyProfile() {
    return axiosInstance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return axiosInstance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return axiosInstance.delete(`auth/login`);
  },
};
