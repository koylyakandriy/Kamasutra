import { stopSubmit } from "redux-form";

import { profileAPI } from "../api/api";
import { PhotosType } from "../types/types";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTOS = "SAVE_PHOTOS";

type PostType = {
  id: number;
  message: string;
  linksCount: number;
};
type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

type ProfileType = {
  userId: number;
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactsType;
  photos: PhotosType;
};

const initialState = {
  postData: [
    { id: 1, message: "How are you?", linksCount: 12 },
    { id: 2, message: "It's very well day", linksCount: 20 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 5,
        message: action.newPostText,
        linksCount: 0,
      };

      return {
        ...state,
        postData: [...state.postData, newPost],
      };

    case DELETE_POST:
      return {
        ...state,
        postData: state.postData.filter((post) => post.id !== action.postId),
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_STATUS:
      return { ...state, status: action.status };

    case SAVE_PHOTOS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

type AddPostActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostAction = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
});

type DeletePostActionType = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePostAction = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfileAction = (
  profile: ProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetProfileStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setProfileStatusAction = (
  status: string
): SetProfileStatusActionType => ({
  type: SET_STATUS,
  status,
});

type SavePhotoAction = {
  type: typeof SAVE_PHOTOS;
  photos: PhotosType;
};
export const savePhotoAction = (photos: PhotosType): SavePhotoAction => ({
  type: SAVE_PHOTOS,
  photos,
});

export const getProfileThunkCreator = (id: number) => async (dispatch: any) => {
  const res = await profileAPI.getProfile(id);
  dispatch(setUserProfileAction(res.data));
};

export const getProfileStatusThunkCreator = (id: number) => async (
  dispatch: any
) => {
  const res = await profileAPI.getStatus(id);
  dispatch(setProfileStatusAction(res.data));
};

export const updateProfileStatusThunkCreator = (status: string) => async (
  dispatch: any
) => {
  const res = await profileAPI.updateStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setProfileStatusAction(status));
  }
};

export const saveProfilePhotoThunkCreator = (file: any) => async (
  dispatch: any
) => {
  const res = await profileAPI.savePhoto(file);
  if (res.data.resultCode === 0) {
    dispatch(savePhotoAction(res.data.data.photos));
  }
};

export const saveProfileThunkCreator = (profile: ProfileType) => async (
  dispatch: any
) => {
  const res = await profileAPI.saveProfile(profile);
  if (res.data.resultCode === 0) {
    dispatch(getProfileThunkCreator(profile.userId));
  } else {
    dispatch(stopSubmit("editProfile", { _error: res.data.messages[0] }));
    return Promise.reject(res.data.messages[0]);
  }
};

export default profileReducer;
